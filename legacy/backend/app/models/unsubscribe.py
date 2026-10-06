from app import db
from datetime import datetime
import secrets


class Unsubscribe(db.Model):
    __tablename__ = 'unsubscribes'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False, index=True)
    token = db.Column(db.String(32), unique=True, nullable=False, index=True)
    is_unsubscribed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    unsubscribed_at = db.Column(db.DateTime, nullable=True)

    @staticmethod
    def generate_token():
        return secrets.token_hex(16)

    @staticmethod
    def get_or_create(email):
        """이메일로 조회하거나 새로 생성"""
        email = email.lower().strip()
        record = Unsubscribe.query.filter_by(email=email).first()
        if not record:
            record = Unsubscribe(
                email=email,
                token=Unsubscribe.generate_token()
            )
            db.session.add(record)
            db.session.commit()
        return record
