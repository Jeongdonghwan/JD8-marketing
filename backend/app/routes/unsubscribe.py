from flask import Blueprint, request, jsonify, render_template_string
from app import db
from app.models.unsubscribe import Unsubscribe
from datetime import datetime

unsubscribe_bp = Blueprint('unsubscribe', __name__)

# HTML 템플릿
UNSUBSCRIBE_HTML = '''
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>수신거부 확인</title>
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; background: #f4f4f4;
               display: flex; justify-content: center; align-items: center;
               min-height: 100vh; margin: 0; }
        .container { background: white; padding: 40px; border-radius: 8px;
                     text-align: center; max-width: 500px;
                     box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; font-size: 24px; }
        p { color: #666; line-height: 1.8; }
        .email { color: #3498db; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>{{ title }}</h1>
        <p>{{ message|safe }}</p>
        {% if email %}
        <p class="email">{{ email }}</p>
        {% endif %}
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">
            문의: jdhwan1994@naver.com
        </p>
    </div>
</body>
</html>
'''


@unsubscribe_bp.route('/unsubscribe', methods=['GET'])
def unsubscribe_page():
    """수신거부 페이지 (토큰으로 처리)"""
    token = request.args.get('token', '').strip()

    if not token:
        return render_template_string(UNSUBSCRIBE_HTML,
            title='오류',
            message='유효하지 않은 요청입니다.',
            email=None
        )

    record = Unsubscribe.query.filter_by(token=token).first()

    if not record:
        return render_template_string(UNSUBSCRIBE_HTML,
            title='오류',
            message='유효하지 않은 링크입니다.',
            email=None
        )

    if record.is_unsubscribed:
        return render_template_string(UNSUBSCRIBE_HTML,
            title='수신거부 확인',
            message='이미 수신거부 처리가 되어 있습니다.',
            email=record.email
        )

    # 수신거부 처리
    record.is_unsubscribed = True
    record.unsubscribed_at = datetime.utcnow()
    db.session.commit()

    return render_template_string(UNSUBSCRIBE_HTML,
        title='수신거부 완료',
        message='메일 수신거부 등록이 완료되었습니다.<br><br>'
                '수신거부가 되었는데도 메일이 계속 오는 경우<br>'
                '관리팀에 문의를 주시면 바로 처리하겠습니다.',
        email=record.email
    )


# === API 엔드포인트 (이메일 발송 시스템용) ===

@unsubscribe_bp.route('/api/unsubscribe/token', methods=['POST'])
def get_token():
    """이메일로 토큰 조회/생성 (발송 시스템에서 호출)"""
    data = request.get_json()
    email = data.get('email', '').lower().strip()

    if not email:
        return jsonify({'error': 'email required'}), 400

    record = Unsubscribe.get_or_create(email)

    return jsonify({
        'email': record.email,
        'token': record.token,
        'is_unsubscribed': record.is_unsubscribed
    })


@unsubscribe_bp.route('/api/unsubscribe/list', methods=['GET'])
def get_unsubscribed_list():
    """수신거부 목록 조회 (발송 시스템에서 필터링용)"""
    records = Unsubscribe.query.filter_by(is_unsubscribed=True).all()
    return jsonify({
        'unsubscribed': [r.email for r in records],
        'count': len(records)
    })


@unsubscribe_bp.route('/api/unsubscribe/bulk-tokens', methods=['POST'])
def get_bulk_tokens():
    """여러 이메일의 토큰 일괄 조회/생성"""
    data = request.get_json()
    emails = data.get('emails', [])

    result = []
    for email in emails:
        email = email.lower().strip()
        if email:
            record = Unsubscribe.get_or_create(email)
            if not record.is_unsubscribed:
                result.append({
                    'email': record.email,
                    'token': record.token
                })

    return jsonify({'tokens': result})
