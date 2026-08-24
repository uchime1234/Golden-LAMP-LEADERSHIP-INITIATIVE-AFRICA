const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Get GitHub token from environment
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO || 'https://github.com/uchime1234/Golden-LAMP-LEADERSHIP-INITIATIVE-AFRICA.git'

function syncToGitHub() {
  try {
    console.log('📦 Syncing changes to GitHub...')
    
    // Set up git with token
    if (GITHUB_TOKEN) {
      const repoUrl = GITHUB_REPO.replace('https://', `https://${GITHUB_TOKEN}@`)
      execSync(`git remote set-url origin ${repoUrl}`, { stdio: 'inherit' })
    }
    
    // Add all changes
    execSync('git add data/*.json', { stdio: 'inherit' })
    execSync('git add public/uploads/', { stdio: 'inherit' })
    
    // Check if there are changes to commit
    const status = execSync('git status --porcelain').toString().trim()
    if (!status) {
      console.log('✅ No changes to commit')
      return
    }
    
    // Commit with timestamp
    const timestamp = new Date().toISOString()
    execSync(`git commit -m "Admin update: ${timestamp}"`, { stdio: 'inherit' })
    
    // Push to GitHub
    execSync('git push', { stdio: 'inherit' })
    
    console.log('✅ Successfully synced to GitHub!')
  } catch (error) {
    console.error('❌ Failed to sync to GitHub:', error.message)
  }
}

// Run if called directly
if (require.main === module) {
  syncToGitHub()
}

module.exports = { syncToGitHub }