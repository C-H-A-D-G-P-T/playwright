pipeline {
    agent any

    stages {
        stage('Debug') {
            steps {
                sh '''
                echo $PATH
                which node
                which npm
                node -v
                npm -v
                '''
            }
        }

        stage('Install') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                        sh 'npx playwright install'
                    } else {
                        bat 'npm install'
                        bat 'npx playwright install'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright test e2e'
                        sh 'npx playwright test api'
                    } else {
                        bat 'npx playwright test e2e'
                        bat 'npx playwright test api'
                    }
                }
            }
        }
    }
}