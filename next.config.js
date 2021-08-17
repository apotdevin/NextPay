module.exports = {
  async rewrites() {
    return [
      {
        source: '/.well-known/lnurlp/:path*',
        destination: '/api/v1',
      },
    ];
  },
};
