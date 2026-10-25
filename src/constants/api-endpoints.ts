export const ApiEndpoints = {
  auth: {
    createToken: '/auth',
  },

  booking: {
    getBookingIds: '/booking',
    getBooking: (bookingId: string | number) => `/booking/${bookingId}`,
    createBooking: '/booking',
    updateBooking: (bookingId: string | number) => `/booking/${bookingId}`,
    partialUpdateBooking: (bookingId: string | number) =>
      `/booking/${bookingId}`,
    deleteBooking: (bookingId: string | number) => `/booking/${bookingId}`,
  },

  ping: {
    healthCheck: '/ping',
  },
} as const;