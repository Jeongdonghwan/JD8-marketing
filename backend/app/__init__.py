from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, static_folder='../../frontend/dist', static_url_path='')
    app.config.from_object(Config)

    # CORS 설정
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # DB 초기화
    db.init_app(app)

    # 라우트 등록
    from .routes.inquiry import inquiry_bp
    app.register_blueprint(inquiry_bp, url_prefix='/api')

    # DB 테이블 생성
    with app.app_context():
        db.create_all()

    # SPA 라우팅 지원
    @app.route('/')
    @app.route('/<path:path>')
    def serve(path=''):
        return app.send_static_file('index.html')

    return app
