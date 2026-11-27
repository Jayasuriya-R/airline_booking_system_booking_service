const axios = require('axios')
const {serverConfig} = require('../config')
const AppError = require("../utils/errors/app-error")
const {StatusCodes} = require("http-status-codes")

const {BookingRepository} = require("../repositories")
const db = require('../models')
 const bookingRepository = new BookingRepository()
async function createBooking(data){
    const transaction = await db.sequelize.transaction()
    try {
            const flights = await axios.get(`${serverConfig.SEARCH_SERVICE}/api/v1/flights/${data.flightId}`)
             const flightData = flights.data.data
             if(data.seats > flightData.totalSeats){
                throw new AppError("Not Enough Seats available",StatusCodes.BAD_REQUEST)
             }
             const totalPrice = data.seats * flightData.price
             const bookingPayload = {
                ...data,totalCost:totalPrice
             }
             await bookingRepository.createBooking(bookingPayload,transaction)
          await transaction.commit()
        return true
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

module.exports = {
   createBooking
}