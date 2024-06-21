pipeline {
    agent any

    environment {
        // Define environment variables
        NODE_HOME = "${tool 'nodejs'}"
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ritveak/newsgroup.git'
            }
        }
        stage('Build Backend') {
            steps {
                dir('/backend') {
                    sh './mvnw clean package'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                // Navigate to the frontend directory and build the React application
                dir('/frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Test Backend') {
            steps {
                // Run tests for the Spring Boot application
                dir('backend') {
                    sh './mvnw test'
                }
            }
        }
//        stage('Test Frontend') {
//            steps {
//                // Run tests for the React application
//                dir('frontend') {
//                    sh 'npm test'
//                }
//            }
//        }
        stage('Package & Archive') {
            steps {
                // Archive the build artifacts
                archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
                archiveArtifacts artifacts: 'frontend/build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
