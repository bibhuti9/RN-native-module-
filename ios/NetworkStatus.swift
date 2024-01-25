//
//  NetworkStatus.swift
//  NativeNetworkModule
//
//  Created by ayoub aharmim on 16/5/2023.
//

import Foundation
import Network
import React

@objc(NetworkStatus)
class NetworkStatus: RCTEventEmitter {
  let monitor = NWPathMonitor()
  let queue = DispatchQueue(label: "NetworkStatus")
  var previousStatus: NWPath.Status = .unsatisfied

  override init() {
    super.init()
  }

  override func supportedEvents() -> [String]! {
    return ["networkStatusChanged"]
  }

@objc func convertHTML(_ html: String, callback: @escaping RCTResponseSenderBlock) {
        // Your method implementation goes here
        if let attributedString = try? NSAttributedString(data: html.data(using: .utf8)!, options: [.documentType: NSAttributedString.DocumentType.html], documentAttributes: nil) {
            let plainText = attributedString.string
            // You can use callback to send data back to React Native
            callback([plainText])
        } else {
            // Handle the error case
            callback(["Error converting HTML"])
        }
    }

  @objc
  func startMonitoring() {
    let queue = DispatchQueue(label: "NetworkStatus")
            monitor.start(queue: queue)
            monitor.pathUpdateHandler = { [weak self] path in
                guard let self = self else { return }
                let currentStatus = path.status
                if currentStatus != self.previousStatus {
                    self.previousStatus = currentStatus
                    var status = ""
                    switch currentStatus {
                    case .satisfied:
                        status = "connected"
                    default:
                        status = "disconnected"
                    }
                  print(currentStatus)
                  self.sendEvent(withName: "networkStatusChanged", body: ["status": status])
                }
            }
  }
  
  @objc
  func stopMonitoring() {
    monitor.cancel()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

