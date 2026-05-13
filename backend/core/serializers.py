from rest_framework import serializers

from .models import (
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


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class NewsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsImage
        fields = ("id", "image", "is_main")


class NewsSerializer(serializers.ModelSerializer):
    images = NewsImageSerializer(many=True, required=False)

    class Meta:
        model = News
        fields = ("id", "title", "description", "time", "category", "images")

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        news = News.objects.create(**validated_data)
        for image_data in images_data:
            NewsImage.objects.create(news=news, **image_data)
        return news

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if images_data is not None:
            instance.images.all().delete()
            for image_data in images_data:
                NewsImage.objects.create(news=instance, **image_data)

        return instance


class CourseSerializer(serializers.ModelSerializer):
    teacherId = serializers.IntegerField(source="teacher.id", read_only=True)

    class Meta:
        model = Course
        fields = ("id", "title", "description", "image", "teacher", "teacherId")


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = "__all__"


class PrincipalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Principal
        fields = "__all__"


class DocumentGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentGallery
        fields = ("id", "image")


class DocumentSerializer(serializers.ModelSerializer):
    gallery = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    gallery_items = DocumentGallerySerializer(source="gallery", many=True, read_only=True)

    class Meta:
        model = Document
        fields = (
            "id",
            "title",
            "description",
            "time",
            "image",
            "file",
            "gallery",
            "gallery_items",
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["gallery"] = [item["image"] for item in data.pop("gallery_items", [])]
        return data

    def create(self, validated_data):
        gallery_images = validated_data.pop("gallery", [])
        document = Document.objects.create(**validated_data)
        for image in gallery_images:
            DocumentGallery.objects.create(document=document, image=image)
        return document

    def update(self, instance, validated_data):
        gallery_images = validated_data.pop("gallery", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if gallery_images is not None:
            instance.gallery.all().delete()
            for image in gallery_images:
                DocumentGallery.objects.create(document=instance, image=image)

        return instance


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class GalerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Galery
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = ("created_at",)
