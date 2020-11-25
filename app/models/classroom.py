from .db import db
from .classroom_user import classroom_user


class Classroom(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    class_image_url = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=False)
    daily_objective = db.Column(db.Text, nullable=True)
    meeting_link = db.Column(db.String(255), nullable=True)
    meeting_pw = db.Column(db.String(255), nullable=True)
    active = db.Column(db.Boolean, default=True)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

    students = db.relationship(
        "Student",
        secondary=classroom_user,
        back_populates="classrooms"
    )
    questions = db.relationship(
        "Question",
        back_populates="classroom"
    )
    check_ins = db.relationship(
        "CheckIn",
        back_populates="classroom"
    )
    instructors = db.relationship(
        "Instructor",
        secondary=classroom_user,
        back_populates="classrooms"
    )
    groups = db.relationship(
        "Group",
        back_populates="classroom"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "daily_objective": self.daily_objective,
            "description": self.description,
            "meeting_link": self.meeting_link,
            "meeting_pw": self.meeting_pw,
            "active": self.active,
            "image_url": self.class_image_url,
            "questions": self.questions,
            "instructors": self.instructors,
            "students": self.students,
            "groups": self.groups,
            "check_ins": self.check_ins
        }
