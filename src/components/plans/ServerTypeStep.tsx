import { Card, CardContent } from "@/components/ui/card"
import { ServerType, StepProps } from "./types"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

const SERVER_TYPE_INFO = {
  PaperMC: {
    name: "PaperMC",
    description: "High performance fork of Spigot with additional features and optimizations"
  },
  Fabric: {
    name: "Fabric",
    description: "Lightweight, modular modding toolchain for Minecraft"
  },
  PocketmineMP: {
    name: "PocketmineMP",
    description: "Server software for Minecraft: Bedrock Edition"
  },
  Forge: {
    name: "Forge",
    description: "Popular modding API for Minecraft: Java Edition"
  },
  GeyserMC: {
    name: "GeyserMC",
    description: "Bridge between Minecraft: Java Edition and Bedrock Edition"
  }
}

export default function ServerTypeStep({ state, onUpdate, onNext, onBack, availableOptions }: StepProps) {
  const isMobile = useIsMobile()
  const serverTypes = availableOptions as ServerType[]
  
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">Select Server Type</h2>
        <p className="text-sm md:text-base text-muted-foreground px-4">
          Choose the server software that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 px-4 md:px-0">
        {serverTypes.map((type) => (
          <Card
            key={type}
            className={`
              transition-all duration-200 hover:shadow-md active:scale-[0.99]
              ${state.serverType === type ? 'border-2 border-primary ring-2 ring-primary/20' : ''}
            `}
          >
            <CardContent
              className="p-4 md:p-6 cursor-pointer touch-target-expand"
              onClick={() => {
                onUpdate({ serverType: type })
                // Only auto-advance on desktop
                if (!isMobile) {
                  onNext()
                }
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-foreground">
                    {SERVER_TYPE_INFO[type].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {SERVER_TYPE_INFO[type].description}
                  </p>
                </div>
                <div className={`
                  w-4 h-4 rounded-full border-2 flex-shrink-0
                  ${state.serverType === type 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground'
                  }
                `} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 px-4 md:px-0">
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full md:w-auto order-2 md:order-1"
          >
            Back
          </Button>
        )}
        {isMobile && (
          <Button 
            onClick={onNext}
            className="w-full md:w-auto order-1 md:order-2"
            disabled={!state.serverType}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}