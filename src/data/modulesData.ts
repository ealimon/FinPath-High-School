import { ModuleData } from '../types';

export const MODULES_DATA: ModuleData[] = [
  {
    id: 1,
    title: 'First Job, Taxes, W-2 & 1099 Paychecks',
    subtitle: 'W-4 VS W-9, W-2 VS 1099-NEC, FICA & GROSS VS NET PAY',
    status: 'DONE',
    tag: 'TAXES & PAY',
    category: 'Earning',
    learningConcepts: [
      'Learn how to fill out Form W-4 accurately to avoid owing taxes or giving an interest-free loan to the IRS.',
      'Understand mandatory FICA (Social Security 6.2% + Medicare 1.45% = 7.65%) withheld from every paycheck.',
      'Master calculating Gross Pay vs Net Take-Home Pay before creating any personal budget.',
      'Distinguish between W-2 Employees (taxes withheld automatically) and 1099 Independent Contractors (you owe 15.3% self-employment tax).'
    ],
    tutorialSlides: [
      {
        title: 'Form W-4 & Tax Withholding',
        subtitle: 'Your First Day On The Job',
        content: 'When hired as a regular employee, you complete Form W-4. This tells your employer how much federal income tax to withhold from each paycheck based on your filing status. Withholding too little causes unexpected tax bills in April; withholding too much gives the IRS an interest-free loan.',
        iconName: 'FileText',
        keyTakeaway: 'Accurate W-4 withholding prevents surprise tax bills while maximizing your regular take-home pay.'
      },
      {
        title: 'W-2 Employee vs. 1099 Independent Contractor (Gig / Freelance)',
        subtitle: 'The 15.3% Self-Employment Tax Reality',
        content: 'Many teens earn money through gig apps (DoorDash, UberEats, Instacart), freelancing (graphic design, video editing, tutoring), or lawn care as 1099 Independent Contractors. Unlike a W-2 employee where employers withhold taxes and pay half your FICA, 1099 contractors receive 100% gross cash with ZERO taxes withheld! Contractors must pay the full 15.3% Self-Employment Tax if they earn $400 or more.',
        iconName: 'Briefcase',
        keyTakeaway: 'Always set aside 25% to 30% of every 1099 contractor payment into a separate savings account for taxes!'
      },
      {
        title: 'Decoding Your Paystub: FICA & Income Taxes',
        subtitle: 'Where Does The Money Go?',
        content: 'FICA taxes fund Social Security (6.2%) and Medicare (1.45%), totaling 7.65% from gross pay. On top of FICA, federal and state income taxes are deducted based on your W-4. Your remaining direct deposit is your Net Take-Home Pay.',
        iconName: 'DollarSign',
        keyTakeaway: 'Always base your real-world lifestyle budget on your NET pay, never your gross advertised hourly wage.'
      },
      {
        title: 'Form W-2, 1099-NEC & Filing Taxes (Form 1040)',
        subtitle: 'Tax Season Preparation',
        content: 'By January 31st each year, employers send Form W-2, while clients/gig platforms send Form 1099-NEC. Even if you earned under the standard deduction (~$14,600) and owe $0 in federal income tax, you MUST file Form 1040 to receive a full refund of any taxes withheld!',
        iconName: 'Calendar',
        keyTakeaway: 'Filing your tax return is the ONLY way to get back the federal taxes your employer withheld during the year.'
      }
    ],
    gameType: 'paycheck',
    quiz: [
      {
        question: 'If your hourly pay is $16/hr and you work 20 hours, your Gross Pay is $320. Why is your direct deposit only approximately $272?',
        options: [
          'Mandatory FICA (7.65%) and federal/state income taxes were legally withheld by payroll',
          'The bank charged a $48 fee to receive the direct deposit',
          'The store took a commission on your scheduled hours',
          'Overtime rules automatically reduce base student pay'
        ],
        correctIndex: 0,
        explanation: 'Employers are required by law to withhold FICA (Social Security + Medicare) and income taxes before distributing your Net Pay.'
      },
      {
        question: 'What is the primary difference between a W-2 Employee and a 1099 Independent Contractor (e.g. food delivery, freelance tutoring)?',
        options: [
          'W-2 employees have taxes withheld and employer pays half of FICA; 1099 contractors receive gross payouts and must pay the full 15.3% self-employment tax',
          '1099 contractors never pay any taxes under US federal law',
          'W-2 employees are not allowed to open bank accounts',
          '1099 contractors have taxes automatically filed by gig apps'
        ],
        correctIndex: 0,
        explanation: '1099 contractors receive payouts with 0% tax withheld and are responsible for paying both the employer and employee shares of FICA (15.3% Self-Employment Tax).'
      },
      {
        question: 'What form do you receive by January 31st summarizing your total annual earnings and taxes withheld from an employer?',
        options: [
          'Form W-2',
          'Form W-4',
          'Form 1040-EZ',
          'FAFSA Student Report'
        ],
        correctIndex: 0,
        explanation: 'Form W-2 is the annual wage and tax statement provided by employers to employees.'
      },
      {
        question: 'What percentage of gross wages is deducted for mandatory FICA taxes (Social Security + Medicare)?',
        options: [
          '7.65% (6.2% Social Security + 1.45% Medicare)',
          '15.0% flat rate',
          '2.5% state rate',
          '22.0% federal rate'
        ],
        correctIndex: 0,
        explanation: 'FICA tax is exactly 7.65% for employees (6.2% Social Security + 1.45% Medicare). Employers match this with another 7.65%.'
      },
      {
        question: 'A student worked a summer job, earned $3,500 total, and had $250 in federal tax withheld. How can they get that $250 back?',
        options: [
          'File a federal tax return (Form 1040) during tax season to receive a 100% tax refund',
          'Ask their manager for a cash reimbursement',
          'Fill out a new W-4 form in December',
          'Taxes withheld are permanently forfeited to the government'
        ],
        correctIndex: 0,
        explanation: 'Because the student earned below the standard deduction (~$14,600), their federal income tax is $0. Filing Form 1040 triggers an IRS refund for the full $250.'
      },
      {
        question: 'If you earn $1,000 as a 1099 independent contractor doing graphic design, how much should you immediately transfer into a tax savings account?',
        options: [
          '25% to 30% ($250 to $300)',
          '0% because teenagers are tax-exempt',
          '100% of the entire payout',
          '5% for sales tax'
        ],
        correctIndex: 0,
        explanation: 'Setting aside 25%–30% protects you from surprise self-employment tax (15.3%) and state/federal income tax bills when filing.'
      }
    ],
    worksheet: {
      title: 'Paycheck & Tax Breakdown Worksheet',
      subtitle: 'High School First Job Payroll & 1099 Analysis',
      instructions: 'Examine the scenario and calculate gross pay, taxes withheld, and net take-home income.',
      scenario: 'Jordan works a part-time job at a local café paying $15.00/hour (24 hrs/wk, W-2 employee with 7.65% FICA + 10% income tax withholding). Jordan also earned $500 doing freelance video editing as a 1099 independent contractor.',
      questions: [
        {
          id: 'q1',
          prompt: 'Calculate Jordan\'s Gross Pay for the café week (24 hours x $15.00):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$360.00'
        },
        {
          id: 'q2',
          prompt: 'Calculate the total taxes withheld from the café paycheck (17.65% total of $360.00):',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$63.54 ($27.54 FICA + $36.00 Income Tax)'
        },
        {
          id: 'q3',
          prompt: 'What is Jordan\'s weekly Net Take-Home Pay from the café job?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$296.46 ($360.00 - $63.54)'
        },
        {
          id: 'q4',
          prompt: 'How much should Jordan set aside (25%-30%) from the $500 freelance video editing 1099 payout for upcoming taxes?',
          type: 'calc',
          placeholder: '$0.00',
          suggestedAnswer: '$125.00 to $150.00 (25% to 30% of $500)'
        },
        {
          id: 'q5',
          prompt: 'Why will Jordan receive Form W-2 from the café but Form 1099-NEC from the video editing client in January?',
          type: 'reflection',
          placeholder: 'Explain the difference between W-2 employee and 1099 contractor...',
          suggestedAnswer: 'The café is an employer that withholds payroll taxes (W-2). The video client hired Jordan as an independent contractor with zero tax withholding (1099-NEC).'
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
      'Discover High-Yield Savings Accounts (HYSA) paying 4-5% APY vs traditional 0.01% APY bank accounts.',
      'Understand FDIC insurance coverage ($250,000 per depositor).'
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
      },
      {
        question: 'What is the standard FDIC insurance limit per depositor, per insured bank, for each account ownership category?',
        options: [
          '$250,000',
          '$10,000',
          '$50,000',
          '$1,000,000'
        ],
        correctIndex: 0,
        explanation: 'FDIC insurance protects your deposits up to $250,000 in the rare event of a bank failure.'
      },
      {
        question: 'Why is an online High-Yield Savings Account (HYSA) superior to a traditional big bank savings account for emergency funds?',
        options: [
          'It pays 4.0% to 5.0%+ APY compared to traditional 0.01% rates, while keeping funds safe and liquid',
          'It is invested in high-risk crypto tokens',
          'It locks your money so you cannot withdraw for 10 years',
          'It replaces the need to ever pay taxes'
        ],
        correctIndex: 0,
        explanation: 'HYSAs provide 400x–500x higher annual percentage yield (APY) with full FDIC insurance and quick liquidity.'
      },
      {
        question: 'How does a debit card differ from a credit card when making a purchase at a store?',
        options: [
          'A debit card deducts money directly from your existing checking balance; a credit card borrows money from a bank on credit',
          'A debit card builds a credit score faster than a credit card',
          'A debit card charges 25% interest on every purchase',
          'There is no functional or financial difference'
        ],
        correctIndex: 0,
        explanation: 'Debit cards transfer your own cash immediately from your checking account; credit cards create a loan balance due at the end of the billing cycle.'
      },
      {
        question: 'What is the "APY" (Annual Percentage Yield) on a savings account?',
        options: [
          'The total real rate of return earned on your deposit over one year, taking into account compounding interest',
          'The annual fee the bank charges you to hold money',
          'The percentage of your money taken by state taxes',
          'The penalty charged for withdrawing cash at an ATM'
        ],
        correctIndex: 0,
        explanation: 'APY measures the actual annual rate of return earned on a deposit, reflecting how often interest compounds.'
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
        },
        {
          id: 'q3',
          prompt: 'Why should Taylor opt out of debit card overdraft protection when opening a checking account?',
          type: 'reflection',
          placeholder: 'Explain overdraft protection risks...',
          suggestedAnswer: 'Opting out prevents expensive $35 penalty fees on small purchases if account balance runs low.'
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
        explanation: '20% of $1,200 is $240 (0.20 x $1,200).'
      },
      {
        question: 'Which of the following expenses falls strictly into the "50% Needs" category?',
        options: [
          'Prescription medicine and minimum required auto insurance',
          'A weekend gaming subscription and concert tickets',
          'Designer sneakers and dining out with friends',
          'A new premium gym membership with spa access'
        ],
        correctIndex: 0,
        explanation: 'Needs represent essential survival costs (housing, basic groceries, healthcare, mandatory transit).'
      },
      {
        question: 'How many months of essential living expenses do financial advisors recommend keeping in an emergency fund?',
        options: [
          '3 to 6 months of essential living expenses',
          '1 week of lunch money',
          '5 full years of gross salary',
          'Emergency funds are unnecessary if you have a credit card'
        ],
        correctIndex: 0,
        explanation: 'A 3 to 6 month emergency fund protects against unexpected job loss, medical emergencies, or car repairs without going into debt.'
      },
      {
        question: 'What is the core principle of "Zero-Based Budgeting"?',
        options: [
          'Every dollar of net income is assigned a specific job (Expenses, Savings, Debt) so Income minus Outflow equals zero',
          'Spending all your money until your checking account balance is zero',
          'Refusing to spend any money on weekends',
          'Only purchasing items with 0% sales tax'
        ],
        correctIndex: 0,
        explanation: 'Zero-based budgeting ensures 100% of your earnings are intentionally allocated to needs, wants, and savings before the month begins.'
      },
      {
        question: 'If unexpected car repairs cost $500, what is the best financial habit to cover the cost?',
        options: [
          'Pay from your High-Yield Savings Account emergency fund that you previously built up',
          'Put it on a 26% APR credit card and pay the minimum payment',
          'Take out a payday loan at 400% interest',
          'Ignore the bill and avoid answering phone calls'
        ],
        correctIndex: 0,
        explanation: 'An emergency fund exists specifically to absorb unexpected life emergencies without generating high-interest debt.'
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
          'Payment History (paying bills on time every month)',
          'Your annual salary amount',
          'How many debit cards you own',
          'The total balance in your savings account'
        ],
        correctIndex: 0,
        explanation: 'On-time payment history represents 35% of your FICO score calculation.'
      },
      {
        question: 'How can you use a credit card every month and never pay a single dollar in interest charges?',
        options: [
          'Pay the full Statement Balance by the due date every single month',
          'Pay the minimum monthly payment on time',
          'Only make purchases under $25',
          'Credit cards always charge interest on every purchase'
        ],
        correctIndex: 0,
        explanation: 'Credit cards provide a grace period (~21-25 days). Paying the statement balance in full incurs 0% interest.'
      },
      {
        question: 'What is the recommended maximum Credit Utilization Ratio to maintain an excellent credit score?',
        options: [
          'Under 10% to 30% of your total credit limit',
          'Between 80% and 100%',
          'Always max out the card every month',
          '50% to 75%'
        ],
        correctIndex: 0,
        explanation: 'Credit scoring models penalize high utilization. Keeping balances under 10%–30% of limits boosts scores.'
      },
      {
        question: 'What is a "Secured Credit Card" and why is it ideal for an 18-year-old with no credit history?',
        options: [
          'A card requiring a refundable cash deposit that serves as your credit limit while reporting on-time payments to credit bureaus',
          'A card with an armed guard at the store',
          'A prepaid gift card that cannot build credit',
          'A credit card that only works at bank branches'
        ],
        correctIndex: 0,
        explanation: 'Secured credit cards require a refundable deposit (e.g. $200–$500), guaranteeing approval while establishing your credit file.'
      },
      {
        question: 'If you have a $1,000 credit limit card with a $300 balance and 24% APR, what happens if you pay only the $25 minimum payment?',
        options: [
          'Most of your payment goes to interest, and it will take years to pay off the $300 debt',
          'The bank forgives the remaining balance after 60 days',
          'Your credit score automatically reaches 850',
          'No interest is charged as long as the minimum is paid'
        ],
        correctIndex: 0,
        explanation: 'Minimum payments prioritize interest fees, keeping you trapped in compound debt for years.'
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
      },
      {
        question: 'What is the main advantage of a Direct Subsidized Federal Student Loan over an Unsubsidized Loan?',
        options: [
          'The federal government pays the interest while you are enrolled in school at least half-time',
          'Subsidized loans never have to be repaid',
          'Subsidized loans give you free cash for vacations',
          'Subsidized loans have no loan limits'
        ],
        correctIndex: 0,
        explanation: 'The U.S. Department of Education covers the interest charges on subsidized loans while you are in school.'
      },
      {
        question: 'What is the recommended rule of thumb for the maximum student loan debt you should borrow for college?',
        options: [
          'Do not borrow more than your expected first-year starting salary after graduation',
          'Borrow the maximum amount the bank offers you',
          'Borrow 4 times your family\'s annual income',
          'Student loan debt size does not matter'
        ],
        correctIndex: 0,
        explanation: 'Borrowing less than your expected first-year salary keeps your standard monthly loan payments under 10% of gross pay.'
      },
      {
        question: 'What is the FAFSA (Free Application for Federal Student Aid)?',
        options: [
          'The official free annual application required to qualify for federal grants, work-study, and federal student loans',
          'A private student loan application from credit card companies',
          'A mandatory high school graduation exam',
          'A scholarship contest with an entry fee'
        ],
        correctIndex: 0,
        explanation: 'FAFSA is the government portal used by colleges to calculate federal, state, and institutional aid packages.'
      },
      {
        question: 'Why are Federal Direct Student Loans generally safer than Private Student Loans from commercial banks?',
        options: [
          'Federal loans offer income-driven repayment plans (IDR), fixed interest rates, and loan forgiveness options',
          'Federal loans are never tracked by credit bureaus',
          'Private student loans are illegal in the United States',
          'Federal loans cancel all debt after 1 year automatically'
        ],
        correctIndex: 0,
        explanation: 'Federal loans provide flexible consumer protections, income-driven repayment caps, and deferment options.'
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
      },
      {
        question: 'What is the 20/4/10 rule of car buying?',
        options: [
          'Put down 20%, finance for max 4 years (48 mos), and keep total vehicle expenses under 10% of gross pay',
          'Drive 20 mph for 4 hours every 10 days',
          'Pay 20% interest on a 4-year lease with 10 airbags',
          'Buy a 20-year-old car for $4,000 and sell it in 10 months'
        ],
        correctIndex: 0,
        explanation: 'The 20/4/10 rule ensures you don\'t become "underwater" on a car loan or overspend on transportation.'
      },
      {
        question: 'What happens to the value of a brand new car during its first year of ownership?',
        options: [
          'It typically loses (depreciates) 20% to 30% of its value immediately',
          'It increases in value by 10%',
          'It never changes in market value',
          'The dealership buys it back for original price'
        ],
        correctIndex: 0,
        explanation: 'Rapid initial depreciation makes purchasing reliable 3-5 year old pre-owned vehicles much more cost-effective.'
      },
      {
        question: 'What is the difference between Auto Liability insurance and Collision/Comprehensive insurance?',
        options: [
          'Liability pays for damage/injuries you cause to OTHER people; Collision/Comprehensive covers damage to YOUR OWN car',
          'Liability is optional; Collision is legally required everywhere',
          'Liability only applies in parking lots',
          'There is no difference in coverage'
        ],
        correctIndex: 0,
        explanation: 'Liability insurance is legally required to cover harm you cause to other drivers and property.'
      },
      {
        question: 'Why is taking an 84-month (7-year) car loan usually a dangerous financial decision?',
        options: [
          'You pay massive extra interest and will owe more than the car is worth for years (negative equity)',
          'Banks ban car loans over 36 months',
          'Your car warranty is automatically cancelled',
          'You are forbidden from selling the car forever'
        ],
        correctIndex: 0,
        explanation: 'Long loan terms artificially lower monthly payments while massively increasing interest and leaving you underwater.'
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
          'Document apartment condition with time-stamped move-in/move-out photos and keep the unit clean',
          'Paint the walls dark colors without landlord permission',
          'Break the lease 3 months early without notice',
          'Refuse to pay final utility bills'
        ],
        correctIndex: 0,
        explanation: 'Time-stamped photos and clean walls prove pre-existing conditions and prevent unjustified repair deductions.'
      },
      {
        question: 'What percentage of your gross monthly income is the maximum recommended guideline for rent?',
        options: [
          'No more than 30% of gross monthly income',
          'At least 70% of gross income',
          '90% of your take-home pay',
          'Rent should equal 100% of your earnings'
        ],
        correctIndex: 0,
        explanation: 'Financial advisors and landlords recommend keeping rent under 30% of gross pay (the "40x monthly rent" annual salary rule).'
      },
      {
        question: 'What does "Joint and Several Liability" mean on an apartment lease signed with a roommate?',
        options: [
          'Both roommates are 100% legally responsible for the entire rent; if one roommate skips town, the landlord can collect full rent from you',
          'The landlord pays half of your groceries',
          'You only owe 50% of the rent no matter what happens',
          'Roommates are forbidden from having jobs'
        ],
        correctIndex: 0,
        explanation: 'Joint liability legally obligates all signers for the complete lease balance if a roommate fails to pay.'
      },
      {
        question: 'Why should every tenant purchase Renters Insurance (typically ~$15-$20/month)?',
        options: [
          'The landlord\'s building insurance does NOT cover your personal belongings (laptop, clothes, furniture) if there is a fire or theft',
          'Renters insurance pays your monthly rent if you quit your job',
          'It is required by the federal government for filing taxes',
          'It eliminates the need to pay utility bills'
        ],
        correctIndex: 0,
        explanation: 'Landlord policies only cover the physical building structure, leaving your personal contents uninsured without renters insurance.'
      },
      {
        question: 'What typical cash total is required upfront before getting keys to a new $1,200/month apartment?',
        options: [
          'Around $2,400 to $3,600 (First month + Security Deposit and/or Last month rent)',
          'Only a $25 application fee',
          'Zero dollars upfront',
          '$10,000 cash deposit required by state law'
        ],
        correctIndex: 0,
        explanation: 'Move-in costs typically equal 2x to 3x monthly rent for first month rent, deposit, and initial utility connections.'
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
      },
      {
        question: 'What is an S&P 500 Index Fund (such as VOO, SPY, or FXAIX)?',
        options: [
          'A low-cost fund that owns a proportional share in 500 of America\'s largest public corporations',
          'A single high-risk tech startup stock',
          'A high-interest checking account at a local bank',
          'A government lottery ticket'
        ],
        correctIndex: 0,
        explanation: 'An S&P 500 index fund gives instant broad diversification across 500 top US companies at minimal fees.'
      },
      {
        question: 'What is "Dollar-Cost Averaging" (DCA)?',
        options: [
          'Investing a consistent dollar amount on a regular schedule (e.g. $100/mo) regardless of market ups and downs',
          'Trying to guess the exact lowest price of a stock every single day',
          'Selling all your stocks as soon as the market drops 2%',
          'Borrowing money from credit cards to buy stocks'
        ],
        correctIndex: 0,
        explanation: 'Dollar-Cost Averaging removes emotional market timing, buying more shares when prices are cheap and fewer when high.'
      },
      {
        question: 'If you invest $150/month from age 18 to 65 in an index fund averaging 9% annual return, what is the estimated account value at retirement?',
        options: [
          'Over $1,200,000+ (with less than $85,000 invested out of pocket)',
          'Exactly $85,000 with no interest',
          '$25,000 total',
          'Investing cannot grow over time'
        ],
        correctIndex: 0,
        explanation: 'Over 47 years, compound interest generates over $1.1 million in pure growth from ~$85k of contributions.'
      },
      {
        question: 'What requirement must you meet to legally contribute to a Roth IRA?',
        options: [
          'You must have taxable earned income (from a W-2 job, 1099 contractor work, or self-employment) during the year',
          'You must be at least 35 years old',
          'You must have a college degree',
          'You must work for a Fortune 500 corporation'
        ],
        correctIndex: 0,
        explanation: 'IRA rules require earned income at or above your contribution amount (up to the annual IRS cap).'
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
      },
      {
        question: 'What is the single most effective action to prevent identity thieves from opening fraudulent loans or credit cards in your name?',
        options: [
          'Freezing your credit reports for free with Equifax, Experian, and TransUnion',
          'Changing your phone wallpaper',
          'Deleting your personal email account',
          'Carrying your Social Security Card in your wallet'
        ],
        correctIndex: 0,
        explanation: 'A credit freeze legally blocks any financial institution from pulling your credit file to open new credit lines.'
      },
      {
        question: 'Why are Buy Now Pay Later (BNPL) apps like Klarna or Afterpay risky for young consumers?',
        options: [
          'They create the illusion that items cost less, leading to overspending and stacked debt with missed-payment penalty fees',
          'They give away 100% free electronics with no obligations',
          'They are banned under federal banking regulations',
          'They automatically double your credit score'
        ],
        correctIndex: 0,
        explanation: 'BNPL exploits psychological payment friction reduction, causing high default rates and impulse purchases.'
      },
      {
        question: 'Why should you NEVER carry your original Social Security card in your wallet or backpack?',
        options: [
          'If your wallet is lost or stolen, criminals gain the primary master key needed for identity theft and fraudulent credit applications',
          'Social Security cards lose magnetic charge in wallets',
          'It is illegal to hold paper documents outside a bank',
          'Paper cards expire if touched by sunlight'
        ],
        correctIndex: 0,
        explanation: 'Your SSN is the most sensitive financial identifier. Keep the physical card locked securely at home.'
      },
      {
        question: 'A stranger on Venmo/Zelle sends you $200 "by mistake" and messages asking you to send it right back. What is the scam?',
        options: [
          'They paid using a stolen credit card; if you send cash back, the original $200 will be reversed by the bank, leaving you out $200 of your own money',
          'They are rewarding you for being a good person',
          'The bank is testing your account speed',
          'It is an official IRS payment'
        ],
        correctIndex: 0,
        explanation: 'The fake accidental payment scam exploits instant reversible stolen funds against irreversible peer-to-peer transfers.'
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
      },
      {
        question: 'What is the net earnings threshold where the IRS requires 1099 self-employed individuals to file a tax return and pay self-employment tax?',
        options: [
          '$400 of net earnings in a year',
          '$100,000 of gross revenue',
          '$50,000 in bank deposits',
          'Self-employed people are exempt from tax filing'
        ],
        correctIndex: 0,
        explanation: 'Net earnings of $400 or more from self-employment trigger mandatory federal filing and self-employment tax.'
      },
      {
        question: 'Which of the following is a legitimate tax-deductible business expense for a freelance photographer or videographer?',
        options: [
          'Camera lenses, editing software subscriptions (Adobe), and business travel mileage',
          'Casual clothes worn on weekends with friends',
          'Personal groceries for family dinners',
          'Rent paid on a family vacation cabin'
        ],
        correctIndex: 0,
        explanation: 'Ordinary and necessary expenses used directly to earn business income reduce your net taxable profit on Schedule C.'
      },
      {
        question: 'Why should 1099 contractors make quarterly estimated tax payments (April, June, September, January) to the IRS?',
        options: [
          'To avoid IRS penalties and avoid facing a massive unpayable tax bill in April',
          'Quarterly payments are optional donations',
          'The IRS sends free gifts every quarter',
          'Banks require quarterly tax checks to keep accounts open'
        ],
        correctIndex: 0,
        explanation: 'The US tax system is pay-as-you-go. Contractors expecting to owe $1,000+ must make quarterly estimated payments.'
      },
      {
        question: 'If a freelance digital artist earns $4,000 from clients and has $1,000 in legitimate software and equipment expenses, what is their taxable net profit?',
        options: [
          '$3,000 ($4,000 Gross Revenue - $1,000 Expenses)',
          '$4,000 (expenses are ignored)',
          '$0 (art is non-taxable)',
          '$5,000'
        ],
        correctIndex: 0,
        explanation: 'Tax deductions reduce gross revenue to net profit ($3,000), lowering both self-employment and income taxes.'
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

