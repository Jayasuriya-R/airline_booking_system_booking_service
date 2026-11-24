const BookingRepository = require('../repositories')
const {StatusCodes} = require('http-status-codes')
const AppError = require('../utils/errors/app-error')
const bookingRepository = new BookingRepository()
async function createBooking(data){
    try {
        const response = await bookingRepository.create(data)
        return response
        
    } catch (error) {
        if(error.name == 'sequelizeValidationError'){
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message);
            });

           throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
         throw new AppError('Cannot Create a new Booking',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

module.exports = {
    createBooking
}