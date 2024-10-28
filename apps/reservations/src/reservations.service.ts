import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository
  ) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create(CreateReservationDto);
  }

  findAll() {
    return `This action returns all reservations`;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
