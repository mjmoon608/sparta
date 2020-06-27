import boto3 

s3_resource = boto3.resource( 
				's3', 
                aws_access_key_id="AKIASNGD6WI5QZW5XYP6", 
                aws_secret_access_key="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", 
                region_name="ap-northeast-2", 
) 

bucket_name = 'ulguri'
region = "ap-northeast-2"
image_name = "1.jpg"
# get image file 
data = open("C:/Users/user/Desktop/sparta/my_project/Ulguri/temp_img.jpg", 'rb') 

# save image to S3 bucket as public 
s3_resource.Bucket(bucket_name).put_object(Body=data, Key=image_name, ACL='public-read') 

# get public image url 
url = "https://s3-%s.amazonaws.com/%s/%s" % (region, bucket_name, image_name)