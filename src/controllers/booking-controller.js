const {BookingService} = require('../services')
const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const { SuccessResponse } = require('../utils/common')

async function createBooking(req,res){
   const data = {
      flightId:req.body.flightId,
      seats:req.body.seats
   }
   try {
      const response = await BookingService.createBooking(data)
      SuccessResponse.data = response;
      SuccessResponse.message = 'Successfully created the booking'
      return res.status(StatusCodes.OK).json(SuccessResponse)
   } catch (error) {
      ErrorResponse.error = error;
      ErrorResponse.message = 'Something went wrong while booking flight'
     return res.status(error.statusCode).json(ErrorResponse)
   }
}

module.exports ={
    createBooking
}