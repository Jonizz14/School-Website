from django.contrib import admin

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


class NewsImageInline(admin.TabularInline):
    model = NewsImage
    extra = 1


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "time", "category")
    list_filter = ("category", "time")
    search_fields = ("title", "description")
    inlines = [NewsImageInline]


class DocumentGalleryInline(admin.TabularInline):
    model = DocumentGallery
    extra = 1


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "time")
    search_fields = ("title", "description")
    inlines = [DocumentGalleryInline]


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "profession", "phone")
    search_fields = ("first_name", "last_name", "profession")


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name")
    search_fields = ("first_name", "last_name", "achievements")


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "teacher")
    search_fields = ("title", "description")
    list_filter = ("teacher",)


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "number", "email", "pupils", "teachers")
    search_fields = ("name", "email", "number")


@admin.register(Principal)
class PrincipalAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "profession")
    search_fields = ("first_name", "last_name", "profession")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "topic", "start_time", "end_time")
    search_fields = ("topic", "description")
    list_filter = ("start_time",)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("id", "full_name", "subject", "number", "created_at")
    search_fields = ("full_name", "subject", "number", "text")
    list_filter = ("created_at",)


@admin.register(Galery)
class GaleryAdmin(admin.ModelAdmin):
    list_display = ("id", "image")


admin.site.site_header = "School Website Admin"
admin.site.site_title = "School Admin"
admin.site.index_title = "Boshqaruv paneli"
