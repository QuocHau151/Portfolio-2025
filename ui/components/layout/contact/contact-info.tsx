import { Card, CardContent } from "@/components/ui/card";

export function ContactInfo() {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="p-0">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Làm việc cùng nhau
          </h2>
          <p className="text-muted-foreground mb-6">
            Với kinh nghiệm làm việc với TypeScript, Next.js và NestJS, tôi có
            thể giúp bạn xây dựng các ứng dụng web hiện đại, hiệu suất cao và dễ
            bảo trì. Hãy liên hệ để chúng ta có thể thảo luận về dự án của bạn.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="bg-primary/5 hover:bg-primary/10 rounded-lg bg-neutral-800 p-4 transition-colors">
              <h3 className="mb-1 font-medium">Frontend</h3>
              <p className="text-muted-foreground text-sm">
                React, Next.js, TypeScript
              </p>
            </div>
            <div className="bg-primary/5 hover:bg-primary/10 rounded-lg bg-neutral-800 p-4 transition-colors">
              <h3 className="mb-1 font-medium">Backend</h3>
              <p className="text-muted-foreground text-sm">
                NestJS, Node.js, Express
              </p>
            </div>
            <div className="bg-primary/5 hover:bg-primary/10 rounded-lg bg-neutral-800 p-4 transition-colors">
              <h3 className="mb-1 font-medium">Database</h3>
              <p className="text-muted-foreground text-sm">
                MongoDB, PostgreSQL, MySQL
              </p>
            </div>
            <div className="bg-primary/5 hover:bg-primary/10 rounded-lg bg-neutral-800 p-4 transition-colors">
              <h3 className="mb-1 font-medium">DevOps</h3>
              <p className="text-muted-foreground text-sm">
                Ubuntu, Docker, K8s
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
