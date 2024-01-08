import {
  createTaskSchema,
  getSingleTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from '../../../schema/todo'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  createTask: protectedProcedure.input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.create({
        data: {
          ...input,
          user: {
            connect: { id: ctx.session.user?.id }
          },
        },
      })
    }),
  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getSingleTask: protectedProcedure
    .input(getSingleTaskSchema)
    .query(({ ctx, input }) => {
      return ctx.db.task.findUnique({
        where: {
          id: input.taskId,
        },
      });
    }),
  updateTask: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          title: input.title,
          body: input.body,
        },
      });
      return task;
    }),
  deleteTask: protectedProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.task.delete({
        where: {
          id: input.taskId,
        },
      });
    }),
})