import { ModuleData } from '../types';

export const MODULES_DATA: ModuleData[] = [
  {
    id: 1,
    title: 'First Job, Taxes & Paycheck Breakdown',
    subtitle: 'W-4, W-2, FICA & GROSS VS. NET PAY',
    status: 'DONE',
    tag: 'TAXES & PAY',
    category: 'Earning',
    learningConcepts: [
      'Learn how to fill out a Form W-4 accurately to avoid owing taxes or overpaying.',
      'Understand why mandatory FICA (Social Security 6.2% + Medicare 1.45%) is withheld.',
      'Master calculating Gross Pay vs Net Take-Home Pay before making personal budgets.'
    ],
    tutorialSlides: [
      {
        title: 'Form W-4 & Tax Withholding',
        subtitle: 'Your First Day On The Job',
        content: 'When you start a job, you fill out Form W-4. This tells your employer how much federal income tax to withhold from each paycheck based on your filing status and dependents.',
        iconName: 'FileText',
        keyTakeaway: 'Filling out your W-4 correctly ensures you do not get surprised by a big tax bill at year-end.'
      },
      {
        title: 'Decoding Your Paystub: FICA & Income Taxes',
        subtitle: 'Where Does The Money Go?',
        content: 'FICA taxes fund Social Security (6.2%) and Medicare (1.45%). On top of FICA, federal and state income taxes are deducted automatically based on your bracket.',
        iconName: 'DollarSign',
        keyTakeaway: 'Always calculate your real personal budget using your NET pay, not your gross salary.'
      },
      {
        title: 'Form W-2 & Filing Taxes (1040)',
        subtitle: 'Tax Season Preparation',
        content: 'By January 31st each year, your employer sends Form W-2 summarizing your total earnings and taxes paid. You use this W-2 to file your annual tax return (Form 1040).',
        iconName: 'Calendar',
        keyTakeaway: 'If you earned under the standard deduction ($14,600 in 2024), you may get a full refund of federal taxes withheld!'
      }
    ],
    gameType: 'paycheck',
    quiz: [
      {
        question: 'If your hourly pay is $16/hr and you work 20 hours, your Gross Pay is $320. Why is your direct deposit only $272?',
        options: [
          'FICA and income taxes (approx. 15%) were legally withheld by payroll',
          'The bank charged a $48 fee to receive money',
          'The store took a commission on your hours',
          'Overtime rules reduce your base pay'
        ],
        correctIndex: 0,
        explanation: 'Employers must deduct mandatory federal, state, and FICA taxes before distributing your Net Pay.'
      },
      {
        question: 'What form do you receive from your employer in January showing your total annual income and taxes withheld?',
        options: [
          'Form W-2',
          'Form W-4',
          'Form 1099-MISC',
          'FAFSA Student Form'
        ],
        correctIndex: 0,
        explanation: 'Form W-2 summarizes your total earnings and tax withheld for the prior tax year.'
      }
    ],
    worksheet: {
      title: 'Paycheck & Tax Breakdown Worksheet',
      subtitle: 'High School First Job Payroll Analysis',
      instructions: 'Examine the scenario and calculate gross pay, taxes withheld, and net take-home income.',
      scenario: 'Jordan works a part-time job at a local café paying $15.00/hour. Last week, Jordan worked 24 hours. FICA taxes equal 7.65%, and federal/state withholding equals 10%.',
      questions: [
        {
          id: 'q1',
          prompt: 'Calculate Jordan\'s Gross Pay for the week (24 hours x $15.00):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$360.00'
        },
        {
          id: 'q2',
          prompt: 'Calculate the total taxes withheld (17.65% total of $360.00):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$63.54 ($27.54 FICA + $36.00 Income Tax)'
        },
        {
          id: 'q3',
          prompt: 'What is Jordan\'s weekly Net Take-Home Pay?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$296.46 ($360.00 - $63.54)'
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Checking, Savings & Modern Banking',
    subtitle: 'DEBIT CARDS, OVERDRAFT TRAPS & SAVINGS',
    status: 'IN_PROGRESS',
    tag: 'BANKING',
    category: 'Banking',
    learningConcepts: [
      'Understand checking accounts for daily transactions vs savings accounts for long-term goals.',
      'Learn how overdraft fees ($35 per transaction) work and how to opt out of overdraft protection.',
      'Discover High-Yield Savings Accounts (HYSA) paying 4-5% APY vs traditional 0.01% APY bank accounts.'
    ],
    tutorialSlides: [
      {
        title: 'Checking vs. Savings Accounts',
        subtitle: 'The Core Banking Duo',
        content: 'Checking accounts are meant for frequent transactions using debit cards, Venmo, or online bill pay. Savings accounts store money for future goals and pay interest.',
        iconName: 'Landmark',
        keyTakeaway: 'Keep your monthly spending money in checking, and automatically transfer savings out on payday.'
      },
      {
        title: 'The $35 Overdraft Trap',
        subtitle: 'Protecting Your Account',
        content: 'If you buy a $4 boba tea with only $2 in your checking account, banks with "Overdraft Protection" will let the purchase go through but charge a $35 fee! Opting OUT means the card simply declines without a fee.',
        iconName: 'AlertTriangle',
        keyTakeaway: 'Always opt OUT of debit card overdraft protection to avoid $35 penalties on small purchases.'
      },
      {
        title: 'High-Yield Savings Accounts (HYSA)',
        subtitle: 'Put Compound Interest To Work',
        content: 'Traditional big banks pay 0.01% annual interest ($0.10 a year on $1,000). Online High-Yield Savings Accounts pay 4.0% to 5.0% APY ($40 to $50 a year on $1,000)!',
        iconName: 'TrendingUp',
        keyTakeaway: 'An online HYSA earns 400x to 500x more interest on your emergency savings.'
      }
    ],
    gameType: 'banking',
    quiz: [
      {
        question: 'What happens if you swipe your debit card for $10 when you have $5 in checking and you OPTED OUT of overdraft protection?',
        options: [
          'The transaction is declined and you owe $0 in fees',
          'The transaction goes through and you are charged a $35 overdraft fee',
          'Your account is permanently locked',
          'The merchant reports you to a credit bureau'
        ],
        correctIndex: 0,
        explanation: 'Opting out of overdraft protection means the card declines safely without triggering a $35 penalty.'
      }
    ],
    worksheet: {
      title: 'High-Yield Savings & Banking Comparison Worksheet',
      subtitle: 'Evaluating Interest Rates & Fee Structures',
      instructions: 'Compare earnings between traditional banks and online high-yield savings accounts.',
      scenario: 'Taylor saves $2,000 from summer job earnings. Bank A offers a traditional savings account at 0.02% APY. Bank B offers an FDIC-insured High-Yield Savings Account at 4.50% APY.',
      questions: [
        {
          id: 'q1',
          prompt: 'How much interest will Taylor earn in 1 year at Bank A (0.02% of $2,000)?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$0.40 (40 cents)'
        },
        {
          id: 'q2',
          prompt: 'How much interest will Taylor earn in 1 year at Bank B (4.50% of $2,000)?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$90.00'
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Teen & Young Adult Budgeting',
    subtitle: 'THE 50/30/20 RULE & EMERGENCY FUNDS',
    status: 'AVAILABLE',
    tag: 'BUDGETING',
    category: 'Budgeting',
    learningConcepts: [
      'Divide net income using the 50/30/20 budget framework (Needs, Wants, Savings).',
      'Distinguish between fixed essential expenses (gas, phone bill) and variable discretionary costs.',
      'Build a 3-month emergency reserve for unexpected life expenses.'
    ],
    tutorialSlides: [
      {
        title: 'The 50/30/20 Budget Formula',
        subtitle: 'Simple Allocation System',
        content: 'Allocate 50% of net income to Needs (food, transportation, essential bills), 30% to Wants (dining out, subscriptions, entertainment), and 20% to Savings & Investments.',
        iconName: 'PieChart',
        keyTakeaway: 'The 50/30/20 rule gives you clear structure while still allowing guilt-free spending on wants.'
      },
      {
        title: 'Fixed vs. Variable Expenses',
        subtitle: 'Controlling Cash Flow',
        content: 'Fixed costs stay identical every month (car payment, phone bill, insurance). Variable costs fluctuate based on choices (groceries, gas, shopping).',
        iconName: 'Sliders',
        keyTakeaway: 'When money gets tight, variable expenses are the easiest place to make quick budget cuts.'
      }
    ],
    gameType: 'budget',
    quiz: [
      {
        question: 'Under the 50/30/20 budgeting rule, if your monthly net take-home pay is $1,200, how much should go into Savings/Debt Repayment (20%)?',
        options: [
          '$240',
          '$600',
          '$360',
          '$120'
        ],
        correctIndex: 0,
        explanation: '20% of $1,200 is $240.'
      }
    ],
    worksheet: {
      title: 'Personal Budgeting Allocation Worksheet',
      subtitle: 'Designing a Balanced 50/30/20 Budget Plan',
      instructions: 'Categorize expenses and allocate income into Needs, Wants, and Savings.',
      scenario: 'Sam earns $1,500/month working part-time while attending community college.',
      questions: [
        {
          id: 'q1',
          prompt: 'Calculate Sam\'s 50% Needs allowance ($1,500 x 0.50):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$750.00'
        },
        {
          id: 'q2',
          prompt: 'Calculate Sam\'s 30% Wants allowance ($1,500 x 0.30):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$450.00'
        },
        {
          id: 'q3',
          prompt: 'Calculate Sam\'s 20% Savings goal ($1,500 x 0.20):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$300.00'
        }
      ]
    }
  },
  {
    id: 4,
    title: 'Building Credit & Credit Cards',
    subtitle: 'CREDIT SCORES (FICO), APR & DEBT TRAPS',
    status: 'AVAILABLE',
    tag: 'CREDIT',
    category: 'Credit',
    learningConcepts: [
      'Understand how credit card interest (APR) accumulates if you do not pay in full.',
      'Master the 5 key factors that determine your FICO Credit Score (300 to 850).',
      'Learn how to use a credit card like a debit card by paying 100% of the statement balance monthly.'
    ],
    tutorialSlides: [
      {
        title: 'Credit Cards vs. Debit Cards',
        subtitle: 'Borrowing vs Spending Own Cash',
        content: 'A debit card takes money directly out of your bank checking account. A credit card borrows money from a bank that you must repay at the end of the monthly billing cycle.',
        iconName: 'CreditCard',
        keyTakeaway: 'Pay your credit card STATEMENT BALANCE in full every single month to pay 0% interest!'
      },
      {
        title: 'Understanding Your Credit Score (300-850)',
        subtitle: 'Your Financial GPA',
        content: 'Your credit score is calculated from: Payment History (35%), Amounts Owed / Utilization (30%), Length of Credit History (15%), New Credit (10%), and Credit Mix (10%).',
        iconName: 'BarChart2',
        keyTakeaway: 'A high credit score (750+) saves you tens of thousands on car loans, mortgages, and insurance premiums.'
      }
    ],
    gameType: 'credit',
    quiz: [
      {
        question: 'What is the single most important factor affecting your FICO credit score (35% weight)?',
        options: [
          'Payment History (paying bills on time)',
          'Your annual salary amount',
          'How many debit cards you own',
          'The total balance in your savings account'
        ],
        correctIndex: 0,
        explanation: 'On-time payment history is 35% of your credit score computation.'
      }
    ],
    worksheet: {
      title: 'Credit Card Interest & Utilization Worksheet',
      subtitle: 'Calculating APR Charges & Credit Utilization',
      instructions: 'Analyze the impact of carrying a balance on a high-APR credit card.',
      scenario: 'Morgan has a $1,000 credit limit card. Morgan buys a $300 laptop, making the credit utilization 30%. Morgan pays only the $25 minimum monthly payment instead of paying in full.',
      questions: [
        {
          id: 'q1',
          prompt: 'If Morgan\'s credit limit is $1,000 and the balance is $300, what is the credit utilization percentage?',
          type: 'calc',
          placeholder: '0%',
          suggestedAnswer: '30% ($300 / $1,000)'
        },
        {
          id: 'q2',
          prompt: 'Why is paying only the minimum monthly payment dangerous on a card with 24% APR?',
          type: 'reflection',
          placeholder: 'Explain interest growth...',
          suggestedAnswer: 'Minimum payments mostly go toward compounding interest charges rather than reducing principal debt, dragging out repayment for years.'
        }
      ]
    }
  },
  {
    id: 5,
    title: 'Student Loans & FAFSA Financial Aid',
    subtitle: 'GRANTS, SCHOLARSHIPS, LOANS & REPAYMENT',
    status: 'AVAILABLE',
    tag: 'COLLEGE AID',
    category: 'College & Loans',
    learningConcepts: [
      'Learn how FAFSA (Free Application for Federal Student Aid) grants gift aid vs student loans.',
      'Understand Direct Subsidized Loans (government pays interest in school) vs Unsubsidized Loans.',
      'Calculate potential post-graduation debt ratios based on expected career salaries.'
    ],
    tutorialSlides: [
      {
        title: 'Types of Financial Aid',
        subtitle: 'Free Money vs. Borrowed Money',
        content: 'Grants and Scholarships do NOT need to be paid back. Work-Study provides campus jobs. Student Loans MUST be repaid with accrued interest.',
        iconName: 'GraduationCap',
        keyTakeaway: 'Always maximize scholarships and federal grants before accepting any student loan offers.'
      },
      {
        title: 'Subsidized vs. Unsubsidized Loans',
        subtitle: 'Who Pays Interest While In School?',
        content: 'With Subsidized loans, the US government pays interest while you are in college. With Unsubsidized loans, interest starts compounding immediately from day 1.',
        iconName: 'FileMinus',
        keyTakeaway: 'Subsidized federal loans save you thousands in accrued interest during college.'
      }
    ],
    gameType: 'studentloans',
    quiz: [
      {
        question: 'Which type of student aid does NOT need to be repaid after graduation?',
        options: [
          'Pell Grants and Academic Scholarships',
          'Direct Unsubsidized Loans',
          'Parent PLUS Loans',
          'Private Bank Student Loans'
        ],
        correctIndex: 0,
        explanation: 'Grants and scholarships are gift aid that requires zero repayment.'
      }
    ],
    worksheet: {
      title: 'College Financial Aid Package Evaluation',
      subtitle: 'Comparing College Award Letters',
      instructions: 'Calculate the net price of tuition after applying grants vs federal loans.',
      scenario: 'College A costs $25,000/year. They offer $10,000 in grants, $5,500 in subsidized student loans, and $2,000 in work-study.',
      questions: [
        {
          id: 'q1',
          prompt: 'What is the true net cost after deducting FREE gift aid (grants) only?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$15,000 ($25,000 tuition - $10,000 grant)'
        },
        {
          id: 'q2',
          prompt: 'What is the total borrowed debt after 4 years if you accept $5,500 in loans each year?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$22,000 ($5,500 x 4 years)'
        }
      ]
    }
  },
  {
    id: 6,
    title: 'Car Buying, Financing & Auto Insurance',
    subtitle: 'BUYING VS LEASING, APR & INSURANCE DEDUCTIBLES',
    status: 'AVAILABLE',
    tag: 'AUTO & TRANSPORT',
    category: 'Housing & Auto',
    learningConcepts: [
      'Compare buying a used car vs financing a new car vs short-term car leasing.',
      'Understand how auto insurance premiums and collision deductibles ($500 vs $1,000) work.',
      'Factor in total cost of ownership: gas, state registration, oil changes, and car maintenance.'
    ],
    tutorialSlides: [
      {
        title: 'Total Cost of Car Ownership',
        subtitle: 'It Is More Than Just The Sticker Price',
        content: 'A $300 monthly car payment is only part of the cost. You must also budget for Auto Insurance ($150-$250/mo for teens), Gas ($120/mo), Maintenance ($50/mo), and Registration.',
        iconName: 'Car',
        keyTakeaway: 'Total monthly vehicle costs are usually 1.5x to 2x the base loan payment.'
      },
      {
        title: 'Auto Insurance: Premiums vs. Deductibles',
        subtitle: 'Managing Risk',
        content: 'Your Premium is the bill you pay every month to stay insured. Your Deductible is the amount you pay out-of-pocket before insurance pays for accident repairs.',
        iconName: 'Shield',
        keyTakeaway: 'Choosing a higher deductible ($1,000) lowers your monthly insurance premium.'
      }
    ],
    gameType: 'carbuying',
    quiz: [
      {
        question: 'If you have a $500 auto insurance deductible and get into a $2,200 accident, how much do you pay out of pocket?',
        options: [
          '$500',
          '$1,700',
          '$2,200',
          '$0'
        ],
        correctIndex: 0,
        explanation: 'You pay your $500 deductible first, and your insurance covers the remaining $1,700.'
      }
    ],
    worksheet: {
      title: 'Auto Ownership Budget Planner',
      subtitle: 'Estimating Real Monthly Vehicle Expenses',
      instructions: 'Calculate total monthly expenses for a first car purchase.',
      scenario: 'Chris buys a reliable used sedan with a $250/month loan payment. Monthly insurance is $180, estimated gas is $110, and maintenance savings is $40/month.',
      questions: [
        {
          id: 'q1',
          prompt: 'What is Chris\'s total monthly budget needed to maintain this car?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$580.00 ($250 + $180 + $110 + $40)'
        }
      ]
    }
  },
  {
    id: 7,
    title: 'Apartment Renting & Living Expenses',
    subtitle: 'LEASES, SECURITY DEPOSITS & UTILITIES',
    status: 'AVAILABLE',
    tag: 'HOUSING',
    category: 'Housing & Auto',
    learningConcepts: [
      'Learn key clauses in residential lease contracts (notice periods, subletting, rules).',
      'Understand security deposits (1 month rent held upfront) and how to ensure full refund.',
      'Estimate monthly utility bills: electricity, water, internet, trash, and renters insurance.'
    ],
    tutorialSlides: [
      {
        title: 'Renting Your First Apartment',
        subtitle: 'Upfront Move-In Costs',
        content: 'Landlords usually require First Month Rent + Last Month Rent + Security Deposit upfront before handing over keys. On a $1,200/mo apartment, move-in costs equal $3,600!',
        iconName: 'Home',
        keyTakeaway: 'Always save 3x to 4x monthly rent in cash before signing an apartment lease.'
      }
    ],
    gameType: 'renting',
    quiz: [
      {
        question: 'How do you maximize the chances of getting your security deposit fully refunded when moving out?',
        options: [
          'Document apartment condition with move-in/move-out photos and keep the unit clean',
          'Paint the walls dark colors without permission',
          'Break the lease 3 months early without notice',
          'Refuse to pay utility bills'
        ],
        correctIndex: 0,
        explanation: 'Time-stamped photos and clean walls prove damage was not caused during your lease.'
      }
    ],
    worksheet: {
      title: 'First Apartment Budget Worksheet',
      subtitle: 'Total Living Costs & Roommate Split',
      instructions: 'Calculate individual costs when splitting an apartment with a roommate.',
      scenario: 'A 2-bedroom apartment costs $1,600 rent, $150 electric/water, $70 internet, and $20 renters insurance. Two roommates split all expenses 50/50.',
      questions: [
        {
          id: 'q1',
          prompt: 'What is the total monthly bill for the entire apartment?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$1,840.00 ($1,600 + $150 + $70 + $20)'
        },
        {
          id: 'q2',
          prompt: 'How much does EACH roommate pay monthly?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$920.00 ($1,840 / 2)'
        }
      ]
    }
  },
  {
    id: 8,
    title: 'Investing & Compound Growth',
    subtitle: 'ROTH IRA AT 18, S&P 500 INDEX FUNDS & 401(K)',
    status: 'AVAILABLE',
    tag: 'INVESTING',
    category: 'Investing',
    learningConcepts: [
      'Understand the mathematical miracle of compound interest over a 40-year investment horizon.',
      'Learn why opening a Roth IRA at age 18 allows 100% tax-free investment growth and withdrawals.',
      'Explore S&P 500 Index Funds (instant diversification across America\'s top 500 companies).'
    ],
    tutorialSlides: [
      {
        title: 'The Power of Starting Early',
        subtitle: 'Albert Einstein Called Compound Interest The 8th Wonder',
        content: 'Investing $200/month starting at age 18 at an 8% average return grows to over $1,000,000 by age 62! Waiting until age 30 to start requires double the monthly effort.',
        iconName: 'TrendingUp',
        keyTakeaway: 'Time in the market matters far more than timing the market.'
      },
      {
        title: 'What Is A Roth IRA?',
        subtitle: 'Tax-Free Wealth Building',
        content: 'A Roth IRA is an individual retirement account funded with post-tax dollars. Every single dollar of investment growth and future retirement withdrawals is 100% TAX-FREE!',
        iconName: 'ShieldCheck',
        keyTakeaway: 'You must have earned income to contribute to a Roth IRA (up to $7,000/year limit).'
      }
    ],
    gameType: 'compound',
    quiz: [
      {
        question: 'What makes a Roth IRA especially powerful for young investors starting at age 18?',
        options: [
          'All investment earnings and withdrawals in retirement are 100% tax-free',
          'You can withdraw money penalty-free anytime to buy concert tickets',
          'The government matches 100% of your contributions',
          'It guarantees a 20% annual return'
        ],
        correctIndex: 0,
        explanation: 'Because you contribute post-tax dollars, decades of compound investment growth are completely tax-free.'
      }
    ],
    worksheet: {
      title: 'Compound Growth Calculation Worksheet',
      subtitle: 'The Cost of Delaying Investment',
      instructions: 'Examine compound interest growth over time.',
      scenario: 'Investor A invests $100/month starting at age 18. Investor B waits until age 35 and invests $100/month. Both retire at age 65 earning an average 8% market return.',
      questions: [
        {
          id: 'q1',
          prompt: 'Why does Investor A end up with nearly 3x more wealth despite adding only a modest total contribution difference?',
          type: 'reflection',
          placeholder: 'Explain compound interest...',
          suggestedAnswer: 'Investor A gave their money 17 additional years to compound, allowing interest earned in early years to generate its own compounding returns.'
        }
      ]
    }
  },
  {
    id: 9,
    title: 'Consumer Protection & Digital Scams',
    subtitle: 'PHISHING, BUY-NOW-PAY-LATER (BNPL) & IDENTITY THEFT',
    status: 'AVAILABLE',
    tag: 'SECURITY',
    category: 'Security',
    learningConcepts: [
      'Spot fake phishing texts, fraudulent Zelle/Venmo refund scams, and social media impersonations.',
      'Understand the hidden debt traps of Buy Now Pay Later (BNPL) services like Klarna & Affirm.',
      'Freeze your credit reports at Equifax, Experian, and TransUnion to prevent identity theft.'
    ],
    tutorialSlides: [
      {
        title: 'Buy Now Pay Later (BNPL) Risks',
        subtitle: 'The Illusion of Small Payments',
        content: 'Services like Klarna split $200 purchases into "4 easy payments of $50". Studies show BNPL leads consumers to overspend by 20-40% and risk missed payment penalties.',
        iconName: 'ShoppingBag',
        keyTakeaway: 'If you cannot afford to pay for something in full today, split payments create dangerous budget clutter.'
      }
    ],
    gameType: 'scams',
    quiz: [
      {
        question: 'What is the safest step if you receive a text claiming your bank account is locked with a suspicious link?',
        options: [
          'Do NOT click the link; open your official bank app or call the phone number on the back of your card',
          'Click the link immediately to verify your SSN',
          'Text back your password',
          'Send $10 via Zelle to verify identity'
        ],
        correctIndex: 0,
        explanation: 'Banks never send urgent text links asking for sensitive credentials. Always log in directly via official channels.'
      }
    ],
    worksheet: {
      title: 'Digital Security & Scam Identification Case Study',
      subtitle: 'Recognizing Financial Fraud & Protecting Data',
      instructions: 'Analyze the red flags in a real-world digital scam scenario.',
      scenario: 'Maya gets an email that looks like PayPal saying a $499 invoice was paid. It urges calling a toll-free number within 2 hours to cancel.',
      questions: [
        {
          id: 'q1',
          prompt: 'Identify 2 major psychological manipulation tactics red flags used in this phishing email:',
          type: 'reflection',
          placeholder: 'List red flags...',
          suggestedAnswer: '1. False urgency (call within 2 hours), 2. High unexpected dollar charge to trigger panic.'
        }
      ]
    }
  },
  {
    id: 10,
    title: 'Side Hustles & Freelancing Taxes',
    subtitle: '1099 INCOME, SELF-EMPLOYMENT TAX & EXPENSES',
    status: 'AVAILABLE',
    tag: 'FREELANCE',
    category: 'Earning',
    learningConcepts: [
      'Understand the difference between W-2 employment and 1099 independent contractor work.',
      'Calculate Self-Employment Tax (15.3% covering both employee & employer FICA portions).',
      'Track legitimate business tax deductions (mileage, supplies, software) to lower taxable income.'
    ],
    tutorialSlides: [
      {
        title: 'W-2 Employee vs 1099 Contractor',
        subtitle: 'Gig Economy Reality',
        content: 'DoorDash, Uber, freelancing, and YouTube earnings are 1099 income. Unlike a W-2 job where taxes are withheld automatically, 1099 workers receive 100% gross cash and must save 25-30% for tax time!',
        iconName: 'Briefcase',
        keyTakeaway: 'Always set aside 30% of every 1099 payout in a separate savings account for quarterly taxes.'
      }
    ],
    gameType: 'freelance',
    quiz: [
      {
        question: 'Why do 1099 independent contractors pay a higher Self-Employment Tax (15.3%) than W-2 employees?',
        options: [
          'Contractors must pay BOTH the employee (7.65%) and employer (7.65%) portions of FICA taxes',
          'Contractors are penalized for working flexible hours',
          'State governments charge extra fees on gig work',
          '1099 workers do not qualify for tax deductions'
        ],
        correctIndex: 0,
        explanation: 'Employers normally pay half of FICA taxes. Self-employed individuals cover both halves.'
      }
    ],
    worksheet: {
      title: 'Freelance & Gig Income Tax Worksheet',
      subtitle: 'Setting Aside Tax Reserves & Deductions',
      instructions: 'Calculate tax obligations for gig economy earnings.',
      scenario: 'Taylor earns $2,000 mowing lawns and doing web design as an independent 1099 contractor. Taylor spent $300 on software and equipment fuel.',
      questions: [
        {
          id: 'q1',
          prompt: 'Calculate Taylor\'s Net Taxable Profit ($2,000 income - $300 business expenses):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$1,700.00'
        },
        {
          id: 'q2',
          prompt: 'If Taylor sets aside 25% of net profit for taxes, how much should be put into the tax reserve savings account?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$425.00 ($1,700 x 0.25)'
        }
      ]
    }
  }
];
