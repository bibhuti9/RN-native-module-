//
//  WebViewModule.m
//  rnmodule
//
//  Created by Bibhuti Swain on 26/01/24.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(WebViewModule,NSObject)

RCT_EXTERN_METHOD(convertHTML:(NSString *)html callback:(RCTResponseSenderBlock)callback)

@end
