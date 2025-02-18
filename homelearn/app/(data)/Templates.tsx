export default[
    {
        name: 'OOPs Notes Generator',
        desc: 'An AI tool that generates OOPs notes based on selected difficulty level and programming language.',
        category: 'Programming',
        icon: 'https://cdn-icons-png.flaticon.com/128/3001/3001153.png',
        aiPrompt: 'Generate detailed notes on Object-Oriented Programming based on the selected difficulty level and programming language. Include relevant examples and key concepts.',
        slug: 'generate-oops-notes',
        form: [
          {
            label: 'Select programming language',
            field: 'dropdown',
            name: 'programmingLanguage',
            options: [
              { label: 'Python', value: 'python' },
              { label: 'Java', value: 'java' },
              { label: 'C++', value: 'cpp' },
              { label: 'JavaScript', value: 'javascript' }
            ],
            requires: true
          },
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
      },
      {
        name: 'Computer Networks Notes Generator',
        desc: 'An AI tool that generates Computer Networks notes based on difficulty level.',
        category: 'Networking',
        icon: 'https://cdn-icons-png.flaticon.com/128/2921/2921222.png',
        aiPrompt: 'Generate detailed notes on Computer Networks (CN) based on the selected difficulty level. Include important topics like OSI Model, TCP/IP, routing algorithms, etc.',
        slug: 'generate-cn-notes',
        form: [
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
    },
    {
        name: 'DBMS Notes Generator',
        desc: 'An AI tool that generates DBMS notes based on the selected difficulty level.',
        category: 'Database',
        icon: 'https://cdn-icons-png.flaticon.com/128/3234/3234090.png',
        aiPrompt: 'Generate detailed notes on Database Management Systems (DBMS) based on the selected difficulty level. Include topics like normalization, ER diagrams, SQL queries, indexing, and transactions.',
        slug: 'generate-dbms-notes',
        form: [
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
    },
    {
        name: 'SQL Query Generator',
        desc: 'An AI tool that generates SQL queries based on user input for difficulty level.',
        category: 'Database',
        icon: 'https://cdn-icons-png.flaticon.com/128/149/149477.png',
        aiPrompt: 'Generate 5 SQL query problems based on the selected difficulty level. Include relevant schema examples and complex queries for higher levels.',
        slug: 'generate-sql-queries',
        form: [
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
    },
    {
        name: 'Best Online Course Links',
        desc: 'An AI tool that finds and recommends the best online courses for the selected subject.',
        category: 'Education',
        icon: 'https://cdn-icons-png.flaticon.com/128/8582/8582401.png',
        aiPrompt: 'Find the best online courses available for the selected subject. Provide links and a brief description of each course from platforms like Coursera, Udemy, and edX.',
        slug: 'find-best-courses',
        form: [
          {
            label: 'Select subject',
            field: 'dropdown',
            name: 'subject',
            options: [
              { label: 'Data Structures and Algorithms', value: 'dsa' },
              { label: 'Machine Learning', value: 'ml' },
              { label: 'Web Development', value: 'web-dev' },
              { label: 'Cloud Computing', value: 'cloud' },
              { label: 'Cybersecurity', value: 'cybersecurity' }
            ],
            requires: true
          }
        ]
    },
    {
        name: 'Operating System Notes Generator',
        desc: 'An AI tool that generates notes for Operating System topics.',
        category: 'Operating System',
        icon: 'https://cdn-icons-png.flaticon.com/128/155/155495.png',
        aiPrompt: 'Generate detailed notes on Operating System (OS) concepts based on difficulty level. Cover topics like processes, threads, scheduling algorithms, deadlocks, and file systems.',
        slug: 'generate-os-notes',
        form: [
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
    },
    {
        name: 'Cybersecurity Notes Generator',
        desc: 'An AI tool that generates notes on cybersecurity topics based on the selected difficulty.',
        category: 'Security',
        icon: 'https://cdn-icons-png.flaticon.com/128/2921/2921222.png',
        aiPrompt: 'Generate comprehensive notes on cybersecurity concepts based on the selected difficulty level. Include topics like encryption, network security, malware analysis, and ethical hacking.',
        slug: 'generate-cybersecurity-notes',
        form: [
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
    },
    {
        name: 'Data Science Notes Generator',
        desc: 'An AI tool that generates notes for Data Science based on difficulty level.',
        category: 'Data Science',
        icon: 'https://cdn-icons-png.flaticon.com/128/3001/3001153.png',
        aiPrompt: 'Generate detailed notes on Data Science based on the selected difficulty level. Include concepts like data wrangling, machine learning algorithms, and data visualization techniques.',
        slug: 'generate-data-science-notes',
        form: [
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
    },    
    {
        name: 'Machine Learning Notes Generator',
        desc: 'An AI tool that generates notes on Machine Learning based on difficulty level.',
        category: 'Machine Learning',
        icon: 'https://cdn-icons-png.flaticon.com/128/2936/2936127.png',
        aiPrompt: 'Generate detailed notes on Machine Learning (ML) concepts based on the selected difficulty level. Include key algorithms, model evaluation, and feature engineering techniques.',
        slug: 'generate-ml-notes',
        form: [
          {
            label: 'Select difficulty level',
            field: 'dropdown',
            name: 'difficultyLevel',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' }
            ],
            requires: true
          }
        ]
    }
]