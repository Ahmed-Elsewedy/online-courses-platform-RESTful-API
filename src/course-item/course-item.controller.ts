import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseItemService } from './course-item.service';
import { CreateCourseItemDto } from './dto/create-course-item.dto';
import { UpdateCourseItemDto } from './dto/update-course-item.dto';

@Controller('course')
export class CourseItemController {
  constructor(private readonly courseItemService: CourseItemService) { }

  @Post(':id')
  async create(@Body() createCourseItemDto: CreateCourseItemDto, @Param('id') id) {
    return this.courseItemService.create(createCourseItemDto, +id);
  }

  @Get(':id/items')
  findAll(@Param('id') id: string) {
    return this.courseItemService.findAll(+id);
  }

  @Get(':id/:item')
  async findOne(@Param('id') id: string, @Param('item') item: string) {
    return this.courseItemService.findOne(+id, +item);
  }

  @Patch(':id/:item')
  async update(@Param('id') id: string, @Param('item') item: string, @Body() updateCourseItemDto: UpdateCourseItemDto) {
    return this.courseItemService.update(+id, +item, updateCourseItemDto);
  }

  @Delete(':id/:item')
  async remove(@Param('id') id: string, @Param('item') item: string) {
    return this.courseItemService.remove(+id, +item);
  }
}
