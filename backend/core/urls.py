from rest_framework.routers import DefaultRouter

from .views import (
    ContactViewSet,
    CourseViewSet,
    DocumentViewSet,
    EventViewSet,
    GaleryViewSet,
    NewsViewSet,
    PrincipalViewSet,
    SchoolViewSet,
    StudentViewSet,
    TeacherViewSet,
)

router = DefaultRouter()
router.register("teachers", TeacherViewSet, basename="teachers")
router.register("students", StudentViewSet, basename="students")
router.register("news", NewsViewSet, basename="news")
router.register("course", CourseViewSet, basename="course")
router.register("school", SchoolViewSet, basename="school")
router.register("principal", PrincipalViewSet, basename="principal")
router.register("document", DocumentViewSet, basename="document")
router.register("event", EventViewSet, basename="event")
router.register("galery", GaleryViewSet, basename="galery")
router.register("contact", ContactViewSet, basename="contact")

urlpatterns = router.urls
