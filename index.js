
/**
 * This class is handling all the anomaly detections 
 * The class gets the data from server and handles it 
 * If suspicious behavior will occur, it'll notify us
  
 */
class anomalyDetection {
    /**
     * @param NOW holds the exact time and date at tis very moment of creating class
     * @param HOUR holds the specific hour 
     */
    constructor() {
        this.NOW = new Date();
        this.HOUR = this.NOW.getHours()
    }

    /**
     * * These all next three functions detect weather or not there has been suspicious action
     * "pushNoise" Checks if a user pushed between 14 to 16
     * "teamHacker" Checks if a user opened a team with the prefix 'hacker'
     * "deleteInTen" Checked if a user deleted a repository within 10 minutes from creation time
     */
    pushNoise = () => {
        if (this.betweenTwoToFour) {
            this.alertForSuspiciousAction(this.pushNoise.name)
        }
    }
    teamHacker = () => {
        this.alertForSuspiciousAction(this.teamHacker.name)
    }
    /**
     * @param creationDate holds the creation date and time of the repository
     */
    deleteInTen = (creationDate) => {
        if (this.checkIfTenMinutes(creationDate)) {
            this.alertForSuspiciousAction(this.deleteInTen.name)
        }
    }

    // Helper function that checks if the current hour of invocation is between 14:00 to 16:00
    betweenTwoToFour = () => {
        return this.HOUR >= 14 && this.HOUR <= 16 ? true : false
    }

    // Helper function that validates that the repository was indeed deleted in a 10 min range since the creation
    checkIfTenMinutes = (creationDate) => {
        // change creationDate var to a Date format
        const creationDateFormat = new Date(creationDate)
        return this.NOW.getDate() == creationDateFormat.getDate() && this.NOW.getMinutes() - creationDateFormat.getMinutes() <= 10 ? true : false
    }

    // Helper function that logs to the console if there was an actual detection
    alertForSuspiciousAction = (whoCalled) => {
        switch (whoCalled) {
            case this.pushNoise.name:
                console.log("A user has pushed between 14 to 16");
                break;
            case this.teamHacker.name:
                console.log("A user created a team with the prefix 'hacker'");
                break;
            case this.deleteInTen.name:
                console.log("A user has deleted a repository within 10 minutes since he opened it");
                break;
            default:
                break;
        }

    }
}



module.exports = anomalyDetection