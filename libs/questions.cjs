// This could be acheived with a 'when' but I like this readability better
// Also could use type: confirm but I think list still has better UX
const READYorNOT = [
    {
        type: 'list',
        name: 'View Info:',
        message: 'What info do you want to see?',
        choices: ['Departments', 'Employees', 'Roles', 'Quit'],
    },
];

// Collects the info to make the initialized project file
const questions = [
    // GENERAL QUESTIONS ABOUT PROJECT
    {
        type: 'input',
        message: `\x1b[31m=== General Questions ===\x1b[0m
    Who is creating this project?`,
        name: 'author',
        default: `\x1b[32mMatty L\x1b[0m`,
    },
    {
        type: 'input',
        message: `What is the author's GitHub URL?`,
        name: 'github',
        default: `\x1b[32mhttps://github.com/Lawhornmatt\x1b[0m`,
    },
    {
        type: 'input',
        message: `What is the author's email address?`,
        name: 'auth_email',
        default: `\x1b[32mfake@notreal.com\x1b[0m`,
    },
    {
        type: 'input',
        message: `What is the name of the project?`,
        name: 'projName',
        default: `\x1b[32mTBD\x1b[0m`,
    },
    {
        type: 'input',
        message: `What year will this be completed?`,
        name: 'year',
        default: `\x1b[32m2022\x1b[0m`,
    },
    {
        type: 'input',
        message: `Give me a description of the project. Think about:
    the why, the motivation, the problem it solves, etc...`,
        name: 'descriptLong',
        default: `\x1b[32mIt is very complicated, lemme tell ya...\x1b[0m`,
    },
    {
        type: 'input',
        message: `Now summarize all that.\n Give me a description of the project, short this time:`,
        name: 'descriptShort',
        default: `\x1b[32mStuff happens\x1b[0m`,
    },
    {
    // README QUESTIONS
        type: 'input',
        message: `Alright, now for...
\x1b[31m=== ReadMe Questions ===\x1b[0m
    Start by telling me how to install this thing:`,
        name: 'installation',
        default: `\x1b[32mHeck if I know\x1b[0m`,
    },
    {
        type: 'input',
        message: `How does one use this app?`,
        name: 'useage',
        default: `\x1b[32mClick wildly\x1b[0m`,
    },
    {
        type: 'list',
        message: `Choose a license for this app:`,
        name: 'license',
        choices: ['MIT', 'GNU GPL v3', 'Apache'],
    },
    {
        type: 'input',
        message: `Who contributed to the making of this app?`,
        name: 'contrib',
        default: `\x1b[32mThis is a solo-project.\x1b[0m`,
    },
    {
        type: 'input',
        message: `How can one contribute to this project?`,
        name: 'cont_guidelines',
        default: `\x1b[32mSorry, this project is privately maintained.\x1b[0m`,
    },
    {
        type: 'input',
        message: `Give some instructions for testing:`,
        name: 'tests',
        default: `\x1b[32mThank you, but no testing is needed at this time.\x1b[0m`,
    },
    {
    // HTML QUESTIONS
        type: 'input',
        message: `Alright, just a coupla...
\x1b[31m=== HTML Questions ===\x1b[0m
    What are your best Google keyterms?`,
        name: 'keyterms',
        default: `\x1b[32mNone\x1b[0m`,
    },
    {
        type: 'input',
        message: 'Now give a message for the world:',
        name: 'message',
        default: 'Hello World! :)',
    },
    {
    // CSS QUESTIONS
        type: 'list',
        message: `Alright, next up...
\x1b[31m=== CSS Options ===\x1b[0m
    What kinda theme you picturin' for this thing?`,
        name: 'theme',
        choices: ['Dark', 'Light', 'Forest'],
    },
];

// The quick intro blurb
const intro = `
\x1b[31m===@\x1b[0m
\x1b[31m===@\x1b[0m
\x1b[31m===@\x1b[0m
\x1b[41m B  O  I  L  E  R    M  A  K  E  R \x1b[0m
Welcome to \x1b[31mBoilerMaker\x1b[0m.
    We'll get the boilerplate for yer project done in no time!
        Just answer a coupla questions, if ye don't mind... 
 (psst... if you see somethin' that looks like (\x1b[32mdefault\x1b[0m) well that's just
 a recommendation from me. Just smack enter to use it \x1b[4mor\x1b[0m type in your own response.)`;

// The quick outro blurb
const outro = `
Alright, all done, good luck on the project now.
    Just copy paste it outta here and \x1b[31mget to werk\x1b[0m.
\x1b[41m B  O  I  L  E  R    M  A  K  E  R \x1b[0m
\x1b[4mMatthew Lawhorn == 2022 == MIT License\x1b[0m`;

// If user selects YES or NO during READYorNOT
const nothanks = `Hey no judgement, come back when yer ready...`;
const goahead = `Alrighty, lets get started with...`;

module.exports = { 
    READYorNOT, 
    questions, 
    intro, 
    outro, 
    nothanks, 
    goahead 
};