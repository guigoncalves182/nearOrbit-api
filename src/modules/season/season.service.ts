import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Season } from './schemas/season.schema';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(Season.name)
    private seasonModel: Model<Season>,
  ) {}

  async findCurrentSeason(): Promise<Season> {
    const now = new Date().toISOString();

    const currentSeason = await this.seasonModel.findOne({
      startDate: { $lte: now },
      endDate: { $gt: now },
    });

    return currentSeason;
  }
}
