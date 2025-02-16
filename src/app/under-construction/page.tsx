import { Card, CardContent } from "@/components/ui/card"

export default function UnderConstructionPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <h1 className="text-4xl font-bold text-center">Under Construction</h1>
          <p className="text-lg text-center text-muted-foreground">
            This page is currently under construction. Please check back later!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}