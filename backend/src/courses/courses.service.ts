import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  // Initialize the prisma
  constructor(private readonly prisma: PrismaService) {}
  // Include block to be reused
  private include: Prisma.CourseInclude = {
    teacher: { select: { name: true } },
    classTime: { include: { classRoom: { select: { name: true }} } },
  };

  async create(dto: CreateCourseDto) {
    const data: Prisma.CourseCreateInput = {
      name: dto.courseName,
      teacher: { connect: { id: dto.teacherId } },
      classTime: {
        create: {
          timeStart: dto.timeStart,
          timeEnd: dto.timeEnd,
          classRoomId: dto.classRoomId,
        },
      },
    };
    return await this.prisma.course.create({ data });
  }

  async findAll() {
    return await this.prisma.course.findMany({ include: this.include });
  }

  async findOne(id: number) {
    return await this.prisma.course.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const data: Prisma.CourseUpdateInput = {
      name: dto.courseName,
      teacher: dto.teacherId && { connect: { id: dto.teacherId } },
      classTime: dto.schedule && {
        // It'll be updated if it already exists, otherwise it'll be created.
        upsert: {
          where: {id: dto.schedule.scheduleId},
          update: {
            timeStart: dto.schedule.timeStart,
            timeEnd: dto.schedule.timeEnd,
            classRoomId: dto.schedule.classRoomId,
          },
          create: {
            timeStart: dto.schedule.timeStart,
            timeEnd: dto.schedule.timeEnd,
            classRoomId: dto.schedule.classRoomId,
          },
        },
      },
    };
    return await this.prisma.course.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.course.delete({ where: { id } });
  }
}
