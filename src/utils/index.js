const crearNotificacion = async (type, message, link, UserId) => {
  return await Notification.create({
    type: type,
    message: message,
    status: false,
    link: link,
    UserId: UserId,
  });
};

export { crearNotificacion };
