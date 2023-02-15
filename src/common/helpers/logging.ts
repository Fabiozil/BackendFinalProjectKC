import { Injectable, Logger } from "@nestjs/common";
import { DateTime } from "luxon";

@Injectable()
export class LoggerHelper {
    private readonly logger = new Logger();
    private process = [];
    initialLog(traceUUID: string, processDescription: any) {
        this.logger.log(`${traceUUID}-${processDescription} Initializing`);
        this.process.push({
            processName: processDescription,
            timeStamp: DateTime.now(),
        });
    }

    finalLog(traceUUID: string, processDescription: string) {
        try {
            const initialTimeStamp = this.process.filter((process) => {
                return process.processName === processDescription;
            });

            if (initialTimeStamp) {
                this.process.splice(
                    this.process.indexOf(initialTimeStamp[0]),
                    1
                );
            } else {
                this.logger.log(
                    `Error, process with identificator: ${processDescription} not initialized`
                );
                return;
            }

            const processDuration = DateTime.now().diff(
                initialTimeStamp[0].timeStamp,
                "seconds"
            );
            this.logger.log(
                `${traceUUID}-${processDescription} Finishing with ${processDuration}`
            );
        } catch (err) {
            this.logger.log(
                `Error, with the process with identificator: ${processDescription}`
            );
        }
    }

    errorLog(traceUUID: string, processDescription: any) {
        this.logger.error(`${traceUUID}-${processDescription} Error`);
    }
}
