import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WoodsService } from './woods.service';
import { CreateWoodDto } from './dto/create-wood.dto';
import { UpdateWoodDto } from './dto/update-wood.dto';

@Controller('woods')
export class WoodsController {
  constructor(private readonly woodsService: WoodsService) {}

  @Post()
  create(@Body() createWoodDto: CreateWoodDto) {
    return this.woodsService.create(createWoodDto);
  }

  @Get()
  async findAll() {
    return await this.woodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.woodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWoodDto: UpdateWoodDto) {
    return this.woodsService.update(+id, updateWoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.woodsService.remove(+id);
  }
}
