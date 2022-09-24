import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}
  private include = {
    teacher: { select: { name: true } },
    classTime: { include: { classRoom: true } },
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

  async update(id: number, dto: UpdateCourseDto) {
    const data: Prisma.CourseUpdateInput = {
      name: dto.courseName,
      teacher: dto.teacherId && { connect: { id: dto.teacherId } },
      classTime: (dto.timeStart || dto.timeEnd || dto.classRoomId) && {
        upsert: {
          where: (dto.scheduleId && { id: dto.scheduleId }) || {},
          update: {
            timeStart: dto.timeStart,
            timeEnd: dto.timeEnd,
            classRoomId: dto.classRoomId,
          },
          create: {
            timeStart: dto.timeStart,
            timeEnd: dto.timeEnd,
            classRoomId: dto.classRoomId,
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
