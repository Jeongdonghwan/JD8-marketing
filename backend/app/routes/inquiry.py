from flask import Blueprint, request, jsonify
from ..models.inquiry import Inquiry
from .. import db

inquiry_bp = Blueprint('inquiry', __name__)

@inquiry_bp.route('/inquiry', methods=['POST'])
def create_inquiry():
    data = request.get_json()

    # 필수 필드 검증
    if not data:
        return jsonify({'success': False, 'message': '데이터가 없습니다.'}), 400

    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()
    message = data.get('message', '').strip()
    service_type = data.get('service_type', '').strip()

    if not name:
        return jsonify({'success': False, 'message': '이름을 입력해주세요.'}), 400
    if not phone:
        return jsonify({'success': False, 'message': '연락처를 입력해주세요.'}), 400
    if not message:
        return jsonify({'success': False, 'message': '문의 내용을 입력해주세요.'}), 400

    # 문의 저장
    inquiry = Inquiry(
        name=name,
        phone=phone,
        message=message,
        service_type=service_type or None
    )

    db.session.add(inquiry)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': '문의가 접수되었습니다.',
        'inquiry_id': inquiry.id
    }), 201

@inquiry_bp.route('/inquiry', methods=['GET'])
def get_inquiries():
    inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).all()
    return jsonify({
        'inquiries': [inquiry.to_dict() for inquiry in inquiries]
    })
