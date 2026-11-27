const CrudRepository = require('./crud-repository')
const {Booking} = require('../models')

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking)
    }

    async createBooking(data,transaction){
        const payload = {
            flightId:data.flightId,
            userId:data.userId,
            noOfSeats:data.seats,
            totalCost:data.totalCost
        }
      try {
        const response = await Booking.create(payload,{transaction:transaction})
      } catch (error) {
        return error
      }
    }
}

module.exports=BookingRepository