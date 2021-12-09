module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
            authorization: "Basic fnAEZ-jjlvACQk5gRQqhs5y6T6Z3T9EodG8RKBB0",
          },
        ],
      },
    ]
  }, 

}

