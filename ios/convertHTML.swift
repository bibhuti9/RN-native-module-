//
//  convertHTML.swift
//  rnmodule
//
//  Created by Bibhuti Swain on 26/01/24.
//

import Foundation
import UIKit
import React

class WebViewModule: NSObject {

    @objc func convertHTML(_ html: String, callback: @escaping RCTResponseSenderBlock) {
        if let attributedString = try? NSAttributedString(data: html.data(using: .utf8)!, options: [.documentType: NSAttributedString.DocumentType.html, .characterEncoding: String.Encoding.utf8.rawValue], documentAttributes: nil) {
            let plainText = attributedString.string
            callback([plainText])
        } else {
            callback([""])
        }
    }

    @objc func constantsToExport() -> [AnyHashable : Any]! {
        return ["example": "value"] // You can add constants if needed
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
