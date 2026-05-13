from rest_framework import viewsets

from .models import (
    Contact,
    Course,
    Document,
    Event,
    Galery,
    News,
    Principal,
    School,
    Student,
    Teacher,
)
from .serializers import (
    ContactSerializer,
    CourseSerializer,
    DocumentSerializer,
    EventSerializer,
    GalerySerializer,
    NewsSerializer,
    PrincipalSerializer,
    SchoolSerializer,
    StudentSerializer,
    TeacherSerializer,
)


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().order_by("id")
    serializer_class = TeacherSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by("id")
    serializer_class = StudentSerializer


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.prefetch_related("images").all().order_by("-time", "-id")
    serializer_class = NewsSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.select_related("teacher").all().order_by("id")
    serializer_class = CourseSerializer


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all().order_by("id")
    serializer_class = SchoolSerializer


class PrincipalViewSet(viewsets.ModelViewSet):
    queryset = Principal.objects.all().order_by("id")
    serializer_class = PrincipalSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.prefetch_related("gallery").all().order_by("-time", "-id")
    serializer_class = DocumentSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("start_time", "id")
    serializer_class = EventSerializer


class GaleryViewSet(viewsets.ModelViewSet):
    queryset = Galery.objects.all().order_by("id")
    serializer_class = GalerySerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by("-created_at")
    serializer_class = ContactSerializer
