class RegistrationService {
  async create(body: any) {
  }

  async get() {
    return Response.json({
        message: "Hello from elysya"
    })
  }
}

export default RegistrationService;