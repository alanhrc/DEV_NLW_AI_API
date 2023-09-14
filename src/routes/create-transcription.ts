import { FastifyInstance } from 'fastify';
// import { createReadStream } from 'node:fs';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
// import { openAi } from '../lib/openai';

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (request) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    });

    const { videoId } = paramsSchema.parse(request.params);

    // const bodySchema = z.object({
    //   prompt: z.string(),
    // });

    // const { prompt } = bodySchema.parse(request.body);

    // const video = await prisma.video.findUniqueOrThrow({
    //   where: {
    //     id: videoId,
    //   },
    // });

    // const videoPath = video.path;

    // const audioReadStream = createReadStream(videoPath);

    // const response = await openAi.audio.transcriptions.create({
    //   file: audioReadStream,
    //   model: 'whisper-1',
    //   language: 'pt',
    //   response_format: 'json',
    //   temperature: 0,
    //   prompt,
    // });

    const text =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    // const transcription = response.text;
    const transcription = text;

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
      },
    });

    return { transcription };
  });
}
