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
            authorization: "Basic Zm5BRVpwdnV2aUFDUVM0c1ZkSlBxUmR1Q25FNklSbGhLYm5TQ2wxUjp0b2RvOmFkbWlu",
          },
        ],
      },
    ]
  }, 

}

