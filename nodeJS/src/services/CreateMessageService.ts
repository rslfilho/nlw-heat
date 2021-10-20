import prismaClient from '../prisma';
import { io } from '../app';
import { v4 as uuidv4 } from 'uuid';

class CreateMessageService{
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
        id: uuidv4(),
      },
      include: {
        user: true
      },
    });

    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    };

    io.emit('new_message', infoWS);

    return message;
  };
};

export { CreateMessageService };