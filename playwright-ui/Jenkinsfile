pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Test') {
            steps {
                bat 'npx playwright test e2e'
                bat 'npx playwright test api'
            }
        }
    }
}