const {
  ComponentDialog,
  DialogSet,
  DialogTurnStatus,
  WaterfallDialog,
} = require("botbuilder-dialogs");

const MAIN_WATERFALL_DIALOG = "mainWaterfallDialog";

class MainDialog extends ComponentDialog {
  constructor(luisRecognizer, confirmAndThanksDialog) {
    super("MainDialog");

    if (!luisRecognizer)
      throw new Error(
        "[MainDialog]: Missing parameter 'luisRecognizer' is required"
      );
    this.luisRecognizer = luisRecognizer;

    if (!confirmAndThanksDialog)
      throw new Error(
        "[MainDialog]: Missing parameter 'confirmAndThanksDialog' is required"
      );

    // Define the main dialog and its related components.

    this.addDialog(confirmAndThanksDialog).addDialog(
      new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
        this.actStep.bind(this),
        this.finalStep.bind(this),
      ])
    );
    this.initialDialogId = MAIN_WATERFALL_DIALOG;
  }

  /**
   * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
   * If no dialog is active, it will start the default dialog.
   * @param {*} turnContext
   * @param {*} accessor
   */
  async run(turnContext, accessor) {
    const dialogSet = new DialogSet(accessor);
    dialogSet.add(this);

    const dialogContext = await dialogSet.createContext(turnContext);
    const results = await dialogContext.continueDialog();

    if (results.status === DialogTurnStatus.empty) {
      await dialogContext.beginDialog(this.id);
    }
  }

  async actStep(stepContext) {
    if (!this.luisRecognizer.isConfigured) {
      // LUIS is not configured, so we'll just run the confirmAndThanksDialog path.
      return await stepContext.beginDialog("confirmAndThanksDialog");
    }

    return await stepContext.next();
  }

  /**
   * This is the final step in the main waterfall dialog.
   */
  async finalStep(stepContext) {
    // If the child dialog ("bookingDialog") was cancelled or the user failed to confirm, the Result here will be null.
    if (stepContext.result) {
      const result = stepContext.result;
      const msg = ``;
      await stepContext.context
        .sendActivity(msg, msg, InputHints.IgnoringInput)
        .catch((err) => {});
    }
    // Restart the main dialog
    return await stepContext.replaceDialog(this.initialDialogId);
  }
}

module.exports.MainDialog = MainDialog;
