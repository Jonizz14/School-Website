import json
from pathlib import Path

from django.core.management.base import BaseCommand

from core.models import (
    Contact,
    Course,
    Document,
    DocumentGallery,
    Event,
    Galery,
    News,
    NewsImage,
    Principal,
    School,
    Student,
    Teacher,
)


class Command(BaseCommand):
    help = "Load initial data from project db.json"

    def handle(self, *args, **options):
        root_db_json = Path(__file__).resolve().parents[4] / "db.json"
        if not root_db_json.exists():
            self.stdout.write(self.style.ERROR(f"db.json topilmadi: {root_db_json}"))
            return

        with root_db_json.open("r", encoding="utf-8") as f:
            data = json.load(f)

        Contact.objects.all().delete()
        Course.objects.all().delete()
        DocumentGallery.objects.all().delete()
        Document.objects.all().delete()
        Event.objects.all().delete()
        Galery.objects.all().delete()
        NewsImage.objects.all().delete()
        News.objects.all().delete()
        Principal.objects.all().delete()
        School.objects.all().delete()
        Student.objects.all().delete()
        Teacher.objects.all().delete()

        teacher_map = {}
        for item in data.get("teachers", []):
            obj = Teacher.objects.create(
                first_name=item.get("first_name", ""),
                last_name=item.get("last_name", ""),
                profession=item.get("profession", ""),
                image=item.get("image", ""),
                biography=item.get("biography", ""),
                email=item.get("email", ""),
                phone=item.get("phone", ""),
            )
            teacher_map[item.get("id")] = obj

        for item in data.get("students", []):
            Student.objects.create(
                first_name=item.get("first_name", ""),
                last_name=item.get("last_name", ""),
                image=item.get("image", ""),
                biography=item.get("biography", ""),
                achievements=item.get("achievements", ""),
            )

        for item in data.get("news", []):
            obj = News.objects.create(
                title=item.get("title", ""),
                description=item.get("description", ""),
                time=item.get("time"),
                category=item.get("category", 0),
            )
            for image in item.get("images", []):
                NewsImage.objects.create(
                    news=obj,
                    image=image.get("image", ""),
                    is_main=image.get("is_main", False),
                )

        for item in data.get("course", []):
            Course.objects.create(
                title=item.get("title", ""),
                description=item.get("description", ""),
                image=item.get("image", ""),
                teacher=teacher_map.get(item.get("teacher")),
            )

        for item in data.get("school", []):
            School.objects.create(
                name=item.get("name", ""),
                number=item.get("number", ""),
                email=item.get("email", ""),
                instagram=item.get("instagram", ""),
                telegram=item.get("telegram", ""),
                facebook=item.get("facebook", ""),
                pupils=item.get("pupils", 0),
                teachers=item.get("teachers", 0),
                finishers=item.get("finishers", 0),
                classes=item.get("classes", 0),
                about_image=item.get("about_image", ""),
            )

        for item in data.get("principal", []):
            Principal.objects.create(
                first_name=item.get("first_name", ""),
                last_name=item.get("last_name", ""),
                profession=item.get("profession", ""),
                image=item.get("image", ""),
                instagram=item.get("instagram", ""),
                telegram=item.get("telegram", ""),
                facebook=item.get("facebook", ""),
            )

        for item in data.get("document", []):
            obj = Document.objects.create(
                title=item.get("title", ""),
                description=item.get("description", ""),
                time=item.get("time"),
                image=item.get("image", ""),
                file=item.get("file", ""),
            )
            for image in item.get("gallery", []):
                DocumentGallery.objects.create(document=obj, image=image)

        for item in data.get("event", []):
            Event.objects.create(
                topic=item.get("topic", ""),
                description=item.get("description", ""),
                start_time=item.get("start_time"),
                end_time=item.get("end_time"),
                image=item.get("image", ""),
            )

        for item in data.get("galery", []):
            Galery.objects.create(image=item.get("image", ""))

        self.stdout.write(self.style.SUCCESS("Data muvaffaqiyatli yuklandi."))
