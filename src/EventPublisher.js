import { EventBridge } from 'aws-sdk'

const eventBridge = new EventBridge({ region: process.env.SERVERLESS_REGION })

export default class EventPublisher {
  static execute (payload = {}, options = {}) {
    return eventBridge.putEvents(payload).promise()
  }
}
