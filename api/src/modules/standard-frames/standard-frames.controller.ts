import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StandardFramesService } from './standard-frames.service';
import { CreateStandardFrameDto } from './dto/create-standard-frame.dto';
import { UpdateStandardFrameDto } from './dto/update-standard-frame.dto';

@Controller('standard-frames')
export class StandardFramesController {
  constructor(private readonly standardFramesService: StandardFramesService) {}

  @Post()
  create(@Body() createStandardFrameDto: CreateStandardFrameDto) {
    return this.standardFramesService.create(createStandardFrameDto);
  }

  @Get()
  findAll() {
    return this.standardFramesService.findAll();
  }

  @Get('/active')
  findAllActive() {
    return this.standardFramesService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standardFramesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStandardFrameDto: UpdateStandardFrameDto,
  ) {
    return this.standardFramesService.update(+id, updateStandardFrameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standardFramesService.remove(+id);
  }

  @Patch(':id/active')
  updateActive(
    @Param('id') id: string,
    @Body() updateStandardFrameDto: UpdateStandardFrameDto,
  ) {
    return this.standardFramesService.update(+id, updateStandardFrameDto);
  }
}
