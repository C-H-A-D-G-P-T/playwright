pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                script {
                    def shell = isUnix() ? sh : bat
                    shell('npm install')
                    shell('npx playwright install')
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    def shell = isUnix() ? sh : bat
                    shell('npx playwright test e2e')
                    shell('npx playwright test api')
                }
            }
        }
    }
}