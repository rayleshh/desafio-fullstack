import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  // Initialize the prisma
  constructor(private readonly prisma: PrismaService) { }
  // Include block to be reused
  private include: Prisma.CourseInclude = {
    teacher: { select: { name: true } },
    scheduleList: { include: { classRoomList: { select: { classRoom: { select: { name: true } } } } } },
  };

  async create(dto: CreateCourseDto) {
    const data: Prisma.CourseCreateInput = {
      name: dto.courseName,
      teacher: { connect: dto.teacherIdList.map(id => ({ id })) },
      scheduleList: {
        create: {
          timeStart: dto.timeStart, timeEnd: dto.timeEnd,
          classRoomList: {
            create: dto.classRoomIdList.map(id => ({ classRoomId: id }))
          }
        }
      }
    }
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
      teacher: { connect: dto.teacherIdList?.map(id => ({ id })), disconnect: dto.teacherIdRemoveList?.map(id => ({ id })) },
      scheduleList: dto.schedule && {
        update: {
          where: { id: dto.schedule.scheduleId },
          data: {
            timeStart: dto.schedule.timeStart,
            timeEnd: dto.schedule.timeEnd,
            classRoomList: {
              connectOrCreate: dto.schedule.classRoomIdList?.map(id => ({ where: { classRoomId_classScheduleId: { classScheduleId: dto.schedule.scheduleId, classRoomId: id } }, create: { classRoomId: id } })),
              delete: dto.schedule.classRoomIdRemoveList?.map(id => ({ classRoomId_classScheduleId: { classScheduleId: dto.schedule.scheduleId, classRoomId: id } }))
            }
          }
        }
      }
    }
    return await this.prisma.course.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.course.delete({ where: { id } });
  }
}