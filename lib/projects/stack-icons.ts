export interface StackIcon {
  icon: string;
  color?: string;
}

export const STACK_ICONS: Record<string, StackIcon> = {
  "Next.js": { icon: "/icons/nextjs-original.svg", color: "#FFFFFF" },
  NestJS: { icon: "/icons/nestjs-original.svg", color: "#E0234E" },
  Kubernetes: { icon: "/icons/kubernetes-plain.svg", color: "#326CE5" },
  Docker: { icon: "/icons/docker-original.svg", color: "#2496ED" },
  Redis: { icon: "/icons/redis-original.svg", color: "#DC382D" },
  PostgreSQL: { icon: "/icons/postgresql-original.svg", color: "#336791" },
  TypeScript: { icon: "/icons/typescript-original.svg", color: "#3178C6" },
  MongoDB: { icon: "/icons/mongodb-original.svg", color: "#47A248" },
  Python: { icon: "/icons/python-original.svg", color: "#3776AB" },
  React: { icon: "/icons/react-original.svg", color: "#61DAFB" },
  FastAPI: { icon: "/icons/fastapi-original.svg", color: "#009688" },
  "Node.js": { icon: "/icons/nodejs-original.svg", color: "#339933" },
  BullMQ: { icon: "/icons/redis-original.svg", color: "#DC382D" },
  Ansible: { icon: "/icons/ansible-original.svg" },
  Prisma: { icon: "/icons/prisma-original.svg" },
};
