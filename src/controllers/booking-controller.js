const {BookingService} = require('../services')
const {StatusCodes} = require('http-status-codes')
const {SuccessResponse} = require('../utils/common')
const {ErrorResponse} = require('../utils/common')

async function createFlight(req, res) {
    const data = {
        flightId,
        userId,
        status,
        noOfSeats,
        totalCost
    }
    try {
        const response = await BookingService.createBooking(data)
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully created Booking'
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating Booking'
        return res.status(error.statusCode).json(ErrorResponse)
    }
}