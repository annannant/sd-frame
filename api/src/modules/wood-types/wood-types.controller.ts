import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WoodTypesService } from './wood-types.service';
import { CreateWoodTypeDto } from './dto/create-wood-type.dto';
import { UpdateWoodTypeDto } from './dto/update-wood-type.dto';

@Controller('wood-types')
export class WoodTypesController {
  constructor(private readonly woodTypesService: WoodTypesService) {}

  @Post()
  create(@Body() createWoodTypeDto: CreateWoodTypeDto) {
    return this.woodTypesService.create(createWoodTypeDto);
  }

  @Get()
  findAll() {
    return this.woodTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.woodTypesService.findOne(+id);
  }

  @Get(':id/woods')
  findAllWood(@Param('id') id: string) {
    return this.woodTypesService.findAllWood(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWoodTypeDto: UpdateWoodTypeDto,
  ) {
    return this.woodTypesService.update(+id, updateWoodTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.woodTypesService.remove(+id);
  }
}
