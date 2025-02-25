export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "localhost",
        port: 1025,
        secure: false,
      },
      settings: {
        defaultFrom: "no-reply@example.com",
        defaultReplyTo: "no-reply@example.com",
      },
    },
  },
});
